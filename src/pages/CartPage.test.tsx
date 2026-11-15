import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import toast from "react-hot-toast";
import CartPage from "./CartPage";
import { CartProvider } from "../context/CartContext";
import { cartPaymentApi } from "../services/apiPayment";

vi.mock("../services/apiPayment", () => ({ cartPaymentApi: vi.fn() }));
const getMock = vi.hoisted(() => vi.fn());
vi.mock("../features/cart/useGetCart", () => ({
  useGetCart: () => ({ get: getMock, isPending: false }),
}));
vi.mock("react-hot-toast", () => ({
  default: { error: vi.fn(), success: vi.fn() },
}));

const item = {
  name: "Vitamin C",
  image: "vitamin-c.png",
  price: 10,
  productId: "1",
  purpose: "Immunity",
  quantity: 2,
};

const renderCart = () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <CartPage isAuthenticated={false} />
    </CartProvider>,
  );
  return user;
};

const applyCoupon = async (user: UserEvent, code: string) => {
  await user.type(screen.getByPlaceholderText("Coupon code"), code);
  await user.click(screen.getByRole("button", { name: "Apply" }));
};

const proceedToPayment = async (user: UserEvent) => {
  await user.type(screen.getByPlaceholderText("City"), "Austin");
  await user.type(screen.getByPlaceholderText("ZIP Code"), "73301");
  await user.click(screen.getByRole("button", { name: "Update" }));
  await user.click(screen.getByRole("button", { name: "Checkout" }));
  await user.click(screen.getByRole("button", { name: "Proceed" }));
};

beforeEach(() => {
  localStorage.setItem("cartItems", JSON.stringify([item]));
  localStorage.setItem("cartTotal", JSON.stringify(20));
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

describe("CartPage payment", () => {
  it("disables the checkout button while the payment request is pending", async () => {
    vi.mocked(cartPaymentApi).mockReturnValue(new Promise(() => {}));

    await proceedToPayment(renderCart());

    expect(screen.getByRole("button", { name: /redirecting/i })).toBeDisabled();
  });

  it("shows an error and re-enables checkout when the payment request fails", async () => {
    vi.mocked(cartPaymentApi).mockRejectedValue(new Error("failed"));

    await proceedToPayment(renderCart());

    expect(toast.error).toHaveBeenCalledWith(
      "Payment could not be started. Please try again",
    );
    expect(screen.getByRole("button", { name: "Checkout" })).toBeEnabled();
  });

  it("sends the shipping country and coupon code with the payment request", async () => {
    const user = renderCart();

    await applyCoupon(user, "HEALTH10");
    await proceedToPayment(user);

    expect(cartPaymentApi).toHaveBeenCalledWith(
      [],
      [item],
      "United States",
      "HEALTH10",
    );
  });
});

describe("CartPage coupon", () => {
  it("applies 10% for the advertised HEALTH10 code, case-insensitively", async () => {
    await applyCoupon(renderCart(), "health10");

    expect(screen.getByText("-$2")).toBeInTheDocument();
  });

  it("rejects any other code", async () => {
    await applyCoupon(renderCart(), "ABCD");

    expect(toast.error).toHaveBeenCalledWith("Invalid coupon code");
    expect(screen.getByText("-$0")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeEnabled();
  });
});

describe("CartPage logout", () => {
  it("clears the cart rows when the user logs out", () => {
    getMock.mockImplementationOnce((_, { onSuccess }) =>
      onSuccess({ cartItems: [item], totalPrice: 20 }),
    );
    const { rerender } = render(
      <CartProvider>
        <CartPage isAuthenticated={true} />
      </CartProvider>,
    );
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();

    // Header's logout handler empties the saved cart before auth flips
    localStorage.setItem("cartItems", JSON.stringify([]));
    rerender(
      <CartProvider>
        <CartPage isAuthenticated={false} />
      </CartProvider>,
    );

    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
  });
});
