import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductPage from "./ProductPage";

vi.mock("../ui/ProductCard", () => ({
  default: ({ name }: { name: string }) => <div>{name}</div>,
}));

const product = {
  _id: "1",
  name: "Vitamin C",
  image: "vitamin-c.png",
  price: 10,
  purpose: "Immunity",
  stockQuantity: 5,
};

const okResponse = (data: unknown) => ({
  ok: true,
  json: async () => ({ data }),
});

const fetchMock = vi.fn();

const renderPage = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const view = render(
    <QueryClientProvider client={client}>
      <ProductPage />
    </QueryClientProvider>,
  );
  return { client, ...view };
};

const spinner = (container: HTMLElement) =>
  container.querySelector(".spinnerBase");

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe("ProductPage", () => {
  it("shows the spinner while the products are loading", () => {
    fetchMock.mockReturnValue(new Promise(() => {}));
    const { container } = renderPage();

    expect(spinner(container)).toBeInTheDocument();
  });

  it("lists the products once loaded", async () => {
    fetchMock.mockResolvedValue(okResponse([product]));
    renderPage();

    expect(await screen.findByText("Vitamin C")).toBeInTheDocument();
  });

  it("times the products request out", async () => {
    fetchMock.mockResolvedValue(okResponse([product]));
    renderPage();
    await screen.findByText("Vitamin C");

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("shows the error when the request times out", async () => {
    fetchMock.mockRejectedValue(new DOMException("timed out", "TimeoutError"));
    renderPage();

    expect(
      await screen.findByText(/products could not be loaded/i),
    ).toBeInTheDocument();
  });

  it("labels the sort select", async () => {
    fetchMock.mockResolvedValue(okResponse([product]));
    renderPage();

    expect(await screen.findByLabelText("Sort products")).toHaveAttribute(
      "name",
      "sort",
    );
  });

  it("shows an error with a retry instead of spinning when the request fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    fetchMock.mockResolvedValueOnce(okResponse([product]));
    const { container } = renderPage();

    expect(
      await screen.findByText(/products could not be loaded/i),
    ).toBeInTheDocument();
    expect(spinner(container)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Vitamin C")).toBeInTheDocument();
  });

  it("shows an error when the server responds with a failure status", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 500 });
    renderPage();

    expect(
      await screen.findByText(/products could not be loaded/i),
    ).toBeInTheDocument();
  });

  it("shows the spinner again while retrying", async () => {
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    fetchMock.mockReturnValueOnce(new Promise(() => {}));
    const { container } = renderPage();

    await userEvent.click(
      await screen.findByRole("button", { name: "Try again" }),
    );

    expect(spinner(container)).toBeInTheDocument();
  });

  it("shows an empty state when the store has no products", async () => {
    fetchMock.mockResolvedValue(okResponse([]));
    const { container } = renderPage();

    expect(
      await screen.findByText(/no products available/i),
    ).toBeInTheDocument();
    expect(spinner(container)).not.toBeInTheDocument();
  });

  it("keeps the listed products when a later refetch fails", async () => {
    fetchMock.mockResolvedValueOnce(okResponse([product]));
    fetchMock.mockRejectedValueOnce(new Error("offline"));
    const { client, container } = renderPage();
    await screen.findByText("Vitamin C");

    // react-query notifies the page on the next tick, so wait for it too
    await act(async () => {
      await client.refetchQueries();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
    expect(spinner(container)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/products could not be loaded/i),
    ).not.toBeInTheDocument();
  });
});
