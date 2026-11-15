import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import toast from "react-hot-toast";
import CartPage from "./CartPage";
import { CartProvider } from "../context/CartContext";
import { cartPaymentApi } from "../services/apiPayment";

vi.mock("../services/apiPayment", () => ({ cartPaymentApi: vi.fn() }));
vi.mock("../features/cart/useGetCart", () => ({
  useGetCart: () => ({ get: vi.fn(), isPending: false }),
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

const proceedToPayment = async () => {
  const user = userEvent.setup();
  render(
    <CartProvider>
      <CartPage isAuthenticated={false} />
    </CartProvider>,
  );
  await user.type(screen.getByPlaceholderText("City"), "Austin");
  await user.type(screen.getByPlaceholderText("ZIP Code"), "73301");
  await user.click(screen.getByRole("button", { name: "Update" }));
  await user.click(screen.getByRole("button", { name: "Checkout" }));
  await user.click(screen.getByRole("button", { name: "Proceed" }));
};

describe("CartPage payment", () => {
  beforeEach(() => {
    localStorage.setItem("cartItems", JSON.stringify([item]));
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("disables the checkout button while the payment request is pending", async () => {
    vi.mocked(cartPaymentApi).mockReturnValue(new Promise(() => {}));

    await proceedToPayment();

    expect(screen.getByRole("button", { name: /redirecting/i })).toBeDisabled();
  });

  it("shows an error and re-enables checkout when the payment request fails", async () => {
    vi.mocked(cartPaymentApi).mockRejectedValue(new Error("failed"));

    await proceedToPayment();

    expect(toast.error).toHaveBeenCalledWith(
      "Payment could not be started. Please try again",
    );
    expect(screen.getByRole("button", { name: "Checkout" })).toBeEnabled();
  });
});
