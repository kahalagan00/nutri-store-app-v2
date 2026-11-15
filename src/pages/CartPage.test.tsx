import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  within,
  fireEvent,
} from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import toast from "react-hot-toast";
import CartPage from "./CartPage";
import { CartProvider } from "../context/CartContext";
import { cartPaymentApi } from "../services/apiPayment";
import { removeItemFromCartApi } from "../services/apiCarts";

vi.mock("../services/apiPayment", () => ({ cartPaymentApi: vi.fn() }));
vi.mock("../services/apiCarts", () => ({ removeItemFromCartApi: vi.fn() }));
const getMock = vi.hoisted(() => vi.fn());
const cartQuery = vi.hoisted(() => ({ isPending: false, isError: false }));
vi.mock("../features/cart/useGetCart", () => ({
  useGetCart: () => ({ get: getMock, ...cartQuery }),
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

const cartPage = (isAuthenticated: boolean | null) => (
  <MemoryRouter>
    <CartProvider>
      <CartPage isAuthenticated={isAuthenticated} />
    </CartProvider>
  </MemoryRouter>
);

// Logged in, with the cart request still unanswered: rows come from storage
const renderCart = () => {
  const user = userEvent.setup();
  const view = render(cartPage(true));
  return { user, ...view };
};

// Logged in, with the cart request answered
const renderLoadedCart = (cart: unknown) => {
  getMock.mockImplementation((_, { onSuccess, onSettled }) => {
    onSuccess(cart);
    onSettled?.();
  });
  return renderCart();
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
  vi.resetAllMocks();
  cartQuery.isPending = false;
  cartQuery.isError = false;
});

describe("CartPage payment", () => {
  it("disables the checkout button while the payment request is pending", async () => {
    vi.mocked(cartPaymentApi).mockReturnValue(new Promise(() => {}));

    await proceedToPayment(renderCart().user);

    expect(screen.getByRole("button", { name: /redirecting/i })).toBeDisabled();
  });

  it("shows an error and re-enables checkout when the payment request fails", async () => {
    vi.mocked(cartPaymentApi).mockRejectedValue(new Error("failed"));

    await proceedToPayment(renderCart().user);

    expect(toast.error).toHaveBeenCalledWith(
      "Payment could not be started. Please try again",
    );
    expect(screen.getByRole("button", { name: "Checkout" })).toBeEnabled();
  });

  it("sends the shipping country and coupon code with the payment request", async () => {
    const { user } = renderCart();

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
    await applyCoupon(renderCart().user, "health10");

    expect(screen.getByText("-$2.00")).toBeInTheDocument();
  });

  it("rejects any other code", async () => {
    await applyCoupon(renderCart().user, "ABCD");

    expect(toast.error).toHaveBeenCalledWith("Invalid coupon code");
    expect(screen.queryByText("Discount")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeEnabled();
  });
});

describe("CartPage logout", () => {
  it("clears the cart rows when the user logs out", () => {
    const { rerender } = renderLoadedCart({ cartItems: [item], totalPrice: 20 });
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();

    // Header's logout handler empties the saved cart before auth flips
    localStorage.setItem("cartItems", JSON.stringify([]));
    rerender(cartPage(false));

    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
  });
});

describe("CartPage shipping", () => {
  it("keeps the submitted address visible and lets the user change it", async () => {
    localStorage.setItem("cartTotal", JSON.stringify(50));
    const { user } = renderCart();

    await user.selectOptions(screen.getByRole("combobox"), "Germany");
    await user.type(screen.getByPlaceholderText("City"), "Berlin");
    await user.type(screen.getByPlaceholderText("ZIP Code"), "10115");
    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(screen.getByRole("combobox")).toHaveValue("Germany");
    expect(screen.getByPlaceholderText("City")).toHaveValue("Berlin");
    // The row's line total is also $20.00, so look inside the Cart Total box
    const totals = within(screen.getByText("Cart Total").parentElement!);
    expect(totals.getByText("$20.00")).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox"), "United States");
    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(totals.getByText("$5.00")).toBeInTheDocument();
  });

  it("accepts postcodes longer than 5 characters", async () => {
    const { user } = renderCart();

    await user.type(screen.getByPlaceholderText("ZIP Code"), "SW1A 1AA");

    expect(screen.getByPlaceholderText("ZIP Code")).toHaveValue("SW1A 1AA");
  });
});

describe("CartPage bad data", () => {
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
    renderLoadedCart({ cartItems: [item], totalPrice: null });
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
  });

  it("renders an empty cart when the user has no cart", () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    renderLoadedCart(null);
    expect(screen.getByText("Cart Total")).toBeInTheDocument();
    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
  });
});

describe("CartPage empty and logged-out states", () => {
  it("shows an empty state and disables checkout when the cart is empty", () => {
    renderLoadedCart({ cartItems: [], totalPrice: 0 });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeDisabled();
  });

  it("asks a logged-out visitor to log in instead of listing saved rows", () => {
    render(cartPage(false));

    expect(screen.getByRole("link", { name: "Log in" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Checkout" })).toBeDisabled();
  });
});

describe("CartPage loading", () => {
  const spinner = (container: HTMLElement) =>
    container.querySelector(".spinnerBase");

  it("shows only the spinner while loading with nothing saved", () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    cartQuery.isPending = true;
    const { container } = renderCart();

    expect(spinner(container)).toBeInTheDocument();
    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
  });

  it("shows the saved rows without a spinner while loading", () => {
    cartQuery.isPending = true;
    const { container } = renderCart();

    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
    expect(spinner(container)).not.toBeInTheDocument();
  });

  it("offers a retry when the cart could not be loaded", async () => {
    localStorage.setItem("cartItems", JSON.stringify([]));
    cartQuery.isError = true;
    const { user } = renderCart();

    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(getMock).toHaveBeenCalledTimes(2);
  });
});

describe("CartPage remove", () => {
  const confirmRemove = async (user: UserEvent) => {
    await user.click(screen.getByRole("button", { name: "Remove" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("Remove Vitamin C from your cart?");
    await user.click(within(dialog).getByRole("button", { name: "Remove" }));
  };

  it("does not remove the item when the confirmation is cancelled", async () => {
    const { user } = renderCart();

    await user.click(screen.getByRole("button", { name: "Remove" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(removeItemFromCartApi).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("disables the remove button while the item is being removed", async () => {
    vi.mocked(removeItemFromCartApi).mockReturnValue(new Promise(() => {}));
    const { user } = renderCart();

    await confirmRemove(user);

    expect(removeItemFromCartApi).toHaveBeenCalledWith("1");
    expect(screen.getByRole("button", { name: "Removing..." })).toBeDisabled();
  });

  it("reloads the cart after a successful remove", async () => {
    vi.mocked(removeItemFromCartApi).mockResolvedValue(true);
    const { user } = renderLoadedCart({ cartItems: [item], totalPrice: 20 });
    getMock.mockImplementation((_, { onSuccess, onSettled }) => {
      onSuccess({ cartItems: [], totalPrice: 0 });
      onSettled?.();
    });

    await confirmRemove(user);

    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("does not reload the cart when the remove fails", async () => {
    vi.mocked(removeItemFromCartApi).mockResolvedValue(false);
    const { user } = renderCart();

    await confirmRemove(user);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Remove" })).toBeEnabled();
  });
});

describe("CartPage labels and formatting", () => {
  it("asks for an address instead of showing a $0 shipping fee", () => {
    renderCart();

    expect(screen.getByText("Enter address")).toBeInTheDocument();
    expect(screen.queryByText("Discount")).not.toBeInTheDocument();
  });

  it("shows prices with two decimals and a singular item count", () => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify([{ ...item, price: 19.5, quantity: 1 }]),
    );
    localStorage.setItem("cartNumber", JSON.stringify(1));
    localStorage.setItem("cartTotal", JSON.stringify(24.5));
    renderCart();

    expect(screen.getAllByText(/\$19\.50/)).toHaveLength(2);
    expect(screen.getAllByText("$24.50")).toHaveLength(2);
    expect(screen.getByText("1 item")).toBeInTheDocument();
  });

  it("shows a placeholder when the product image fails to load", () => {
    renderCart();

    fireEvent.error(screen.getByAltText("Image of Vitamin C"));

    expect(screen.getByText("No image")).toBeInTheDocument();
  });
});

describe("CartPage form errors", () => {
  it("labels the shipping and coupon inputs", () => {
    renderCart();

    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText(/^City/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^ZIP Code/)).toBeInTheDocument();
    expect(screen.getByLabelText("Coupon code")).toBeInTheDocument();
  });

  it("shows the validation messages below the inputs", async () => {
    const { user } = renderCart();

    await user.click(screen.getByRole("button", { name: "Update" }));
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(screen.getAllByText("This field is required")).toHaveLength(3);
    expect(screen.getByLabelText(/^City/)).toHaveAccessibleDescription(
      "This field is required",
    );
  });
});
