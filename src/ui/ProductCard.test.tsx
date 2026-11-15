import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import toast from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { updateCartApi } from "../services/apiCarts";
import { CartProvider } from "../context/CartContext";
import ProductCard from "./ProductCard";

vi.mock("../services/apiCarts", () => ({ updateCartApi: vi.fn() }));
vi.mock("react-hot-toast", () => ({
  default: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}));

const updateCartMock = vi.mocked(updateCartApi);

const product = {
  _id: "1",
  name: "Vitamin C",
  image: "vitamin-c.png",
  price: 19.5,
  purpose: "Immunity",
  ingredients: [],
  warnings: [],
  stockQuantity: 5,
  availability: true,
};

const renderCard = (props = {}) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CartProvider>
        <ProductCard {...product} {...props} />
      </CartProvider>
    </QueryClientProvider>,
  );

const saveCartQuantity = (quantity: number) =>
  localStorage.setItem(
    "cartItems",
    JSON.stringify([{ productId: "1", quantity }]),
  );

const increase = () =>
  screen.getByRole("button", { name: "Increase quantity of Vitamin C" });
const addToCart = () =>
  screen.getByRole("button", { name: "Add Vitamin C to cart" });

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.resetAllMocks();
});

describe("ProductCard", () => {
  it("shows the price with two decimals and no discount badge", () => {
    renderCard();

    expect(screen.getByText("$19.50")).toBeInTheDocument();
    expect(screen.queryByText("-25%")).not.toBeInTheDocument();
  });

  it("names the icon-only controls", () => {
    renderCard();

    expect(addToCart()).toBeInTheDocument();
    expect(increase()).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Decrease quantity of Vitamin C" }),
    ).toBeInTheDocument();
  });

  it("toggles the like from the keyboard and keeps it after leaving the page", async () => {
    const user = userEvent.setup();
    const { unmount } = renderCard();
    const like = screen.getByRole("button", { name: "Like Vitamin C" });
    expect(like).toHaveAttribute("aria-pressed", "false");

    like.focus();
    await user.keyboard("{Enter}");
    expect(like).toHaveAttribute("aria-pressed", "true");

    unmount();
    renderCard();
    expect(
      screen.getByRole("button", { name: "Like Vitamin C" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("removes only its own like and survives corrupted storage", async () => {
    localStorage.setItem("likedProducts", JSON.stringify(["1", "2"]));
    const { unmount } = renderCard();

    await userEvent.click(
      screen.getByRole("button", { name: "Like Vitamin C" }),
    );
    expect(JSON.parse(localStorage.getItem("likedProducts")!)).toEqual(["2"]);

    unmount();
    localStorage.setItem("likedProducts", "{not json");
    renderCard();
    expect(
      screen.getByRole("button", { name: "Like Vitamin C" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("describes the image and falls back when it fails to load", () => {
    renderCard();
    const image = screen.getByRole("img", { name: "Image of Vitamin C" });

    fireEvent.error(image);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByText("No image")).toBeInTheDocument();
  });

  it("caps the quantity at the stock when the cart has none of the product", async () => {
    renderCard({ stockQuantity: 2 });

    await userEvent.click(increase());
    await userEvent.click(increase());

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(toast).toHaveBeenCalledTimes(1);
  });

  it("caps the quantity at the stock minus what is already in the cart", async () => {
    saveCartQuantity(3);
    renderCard();

    await userEvent.click(increase());
    await userEvent.click(increase());

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(toast).toHaveBeenCalledWith(
      expect.stringContaining("3 already in your cart"),
    );
  });

  it("blocks adding when the cart already holds all the stock", () => {
    saveCartQuantity(5);
    renderCard();

    expect(screen.getByText("All stock in cart")).toBeInTheDocument();
    expect(addToCart()).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: /increase quantity/i }),
    ).not.toBeInTheDocument();
  });

  it("shows no stock for a product that is sold out", () => {
    renderCard({ stockQuantity: 0 });

    expect(screen.getByText("No stock")).toBeInTheDocument();
    expect(addToCart()).toBeDisabled();
  });

  it("tightens the cap after an add succeeds", async () => {
    updateCartMock.mockResolvedValue({
      cartItems: [{ productId: "1", quantity: 5 }],
      totalPrice: 97.5,
    });
    renderCard();

    await userEvent.click(addToCart());

    expect(await screen.findByText("All stock in cart")).toBeInTheDocument();
    expect(addToCart()).toBeDisabled();
  });

  it("blocks adding a product marked unavailable even when it has stock", () => {
    renderCard({ availability: false });

    expect(screen.getByText("Unavailable")).toBeInTheDocument();
    expect(addToCart()).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: /increase quantity/i }),
    ).not.toBeInTheDocument();
  });

  it("allows adding a product whose availability is missing", () => {
    renderCard({ availability: undefined });

    expect(addToCart()).toBeEnabled();
  });

  it("keeps add-to-cart disabled until the request completes, not for a fixed time", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    let resolveRequest: (cart: unknown) => void = () => {};
    updateCartMock.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );
    renderCard();

    await user.click(addToCart());
    await waitFor(() => expect(addToCart()).toBeDisabled());

    // Longer than the old 3s re-enable timer
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(addToCart()).toBeDisabled();
    await user.click(addToCart());
    expect(updateCartMock).toHaveBeenCalledTimes(1);

    resolveRequest({ cartItems: [], totalPrice: 0 });
    await waitFor(() => expect(addToCart()).toBeEnabled());
  });

  it("re-enables add-to-cart when the request fails", async () => {
    updateCartMock.mockRejectedValue(new Error("Adding to cart failed"));
    renderCard();

    await userEvent.click(addToCart());

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Adding to cart failed"),
    );
    await waitFor(() => expect(addToCart()).toBeEnabled());
  });

  it("treats a missing cart in the add response as empty instead of failing", async () => {
    saveCartQuantity(2);
    updateCartMock.mockResolvedValue(null);
    renderCard();

    await userEvent.click(addToCart());

    await waitFor(() => expect(localStorage.getItem("cartItems")).toBe("[]"));
    expect(toast.error).not.toHaveBeenCalled();
    expect(localStorage.getItem("cartNumber")).toBe("0");
    expect(localStorage.getItem("cartTotal")).toBe("0");
  });
});
