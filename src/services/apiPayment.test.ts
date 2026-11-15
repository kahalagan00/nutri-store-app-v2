import { describe, it, expect, vi } from "vitest";
import { cartPaymentApi } from "./apiPayment";

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: vi.fn().mockResolvedValue({
    redirectToCheckout: vi.fn().mockResolvedValue({}),
  }),
}));

const item = {
  name: "Vitamin C",
  image: "vitamin-c.png",
  price: 10,
  productId: "1",
  purpose: "Immunity",
  quantity: 2,
};

describe("cartPaymentApi", () => {
  it("falls back to the saved cart items when the fetched cart is empty", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ sessionId: "s1" }) });
    vi.stubGlobal("fetch", fetchMock);

    await cartPaymentApi([], [item], "Canada");

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      items: [item],
      country: "Canada",
    });
  });

  it("sends the shipping country and coupon code", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ sessionId: "s1" }) });
    vi.stubGlobal("fetch", fetchMock);

    await cartPaymentApi([item], [], "Canada", "HEALTH10");

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      items: [item],
      country: "Canada",
      couponCode: "HEALTH10",
    });
  });

  it("throws when the checkout session request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }),
    );

    await expect(cartPaymentApi([item], [], "Canada")).rejects.toThrow();
  });

  it("throws when no sessionId is returned", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }),
    );

    await expect(cartPaymentApi([item], [], "Canada")).rejects.toThrow();
  });
});
