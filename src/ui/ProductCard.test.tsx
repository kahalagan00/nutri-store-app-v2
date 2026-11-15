import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import toast from "react-hot-toast";
import { CartProvider } from "../context/CartContext";
import ProductCard from "./ProductCard";

const { updateCart } = vi.hoisted(() => ({ updateCart: vi.fn() }));

vi.mock("../features/cart/useUpdateCart", () => ({
  useUpdateCart: () => ({ updateCart }),
}));
vi.mock("react-hot-toast", () => ({ default: vi.fn() }));

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
    <CartProvider>
      <ProductCard {...product} {...props} />
    </CartProvider>,
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
    updateCart.mockImplementation((_item, { onSuccess }) =>
      onSuccess({
        cartItems: [{ productId: "1", quantity: 5 }],
        totalPrice: 97.5,
      }),
    );
    renderCard();

    await userEvent.click(addToCart());

    expect(screen.getByText("All stock in cart")).toBeInTheDocument();
    expect(addToCart()).toBeDisabled();
  });
});
