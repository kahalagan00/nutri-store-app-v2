import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { updateCartApi } from "./apiCarts";

vi.mock("react-hot-toast", () => ({ default: { error: vi.fn() } }));

const item = {
  name: "Vitamin C",
  image: "vitamin-c.png",
  price: 10,
  productId: "1",
  purpose: "Immunity",
  quantity: 2,
};

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("updateCartApi", () => {
  it("times the request out", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ data: {} }) });

    await updateCartApi(item);

    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
  });

  it("reports a timeout in plain words", async () => {
    fetchMock.mockRejectedValue(new DOMException("aborted", "TimeoutError"));

    await expect(updateCartApi(item)).rejects.toThrow(/took too long/i);
  });
});
