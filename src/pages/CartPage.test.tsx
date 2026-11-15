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

describe("CartPage shipping", () => {
  it("keeps the submitted address visible and lets the user change it", async () => {
    localStorage.setItem("cartTotal", JSON.stringify(50));
    const user = renderCart();

    await user.selectOptions(screen.getByRole("combobox"), "Germany");
    await user.type(screen.getByPlaceholderText("City"), "Berlin");
    await user.type(screen.getByPlaceholderText("ZIP Code"), "10115");
    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(screen.getByRole("combobox")).toHaveValue("Germany");
    expect(screen.getByPlaceholderText("City")).toHaveValue("Berlin");
    expect(screen.getByText("$20")).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox"), "United States");
    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(screen.getByText("$5")).toBeInTheDocument();
  });

  it("accepts postcodes longer than 5 characters", async () => {
    const user = renderCart();

    await user.type(screen.getByPlaceholderText("ZIP Code"), "SW1A 1AA");

    expect(screen.getByPlaceholderText("ZIP Code")).toHaveValue("SW1A 1AA");
  });
});

describe("CartPage bad data", () => {
  const renderLoggedIn = (cart: unknown) => {
    getMock.mockImplementationOnce((_, { onSuccess }) => onSuccess(cart));
    render(
      <CartProvider>
        <CartPage isAuthenticated={true} />
      </CartProvider>,
    );
  };

  it("renders an empty cart when the saved cart items are corrupted", () => {
    localStorage.setItem("cartItems", "{not json");
    renderCart();
    expect(screen.getByText("Cart Total")).toBeInTheDocument();
  });

  it("renders an empty cart when the saved cart items are not a list", () => {
    localStorage.setItem("cartItems", JSON.stringify({ a: 1 }));
    renderCart();
    expect(screen.getByText("Cart Total")).toBeInTheDocument();
  });

  it("renders when the saved cart total is not a number", () => {
    localStorage.setItem("cartTotal", "null");
    renderCart();
    expect(screen.getByText("Cart Total")).toBeInTheDocument();
  });

  it("renders when the fetched cart has no total price", () => {
    renderLoggedIn({ cartItems: [item], totalPrice: null });
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
  });

  it("renders an empty cart when the user has no cart", () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    renderLoggedIn(null);
    expect(screen.getByText("Cart Total")).toBeInTheDocument();
    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
  });
});
