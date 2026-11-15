import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Modal from "./Modal";

const renderModal = () => {
  const onAccept = vi.fn();
  const onClose = vi.fn();
  const user = userEvent.setup();
  render(
    <Modal
      title="Payment"
      content="Continue?"
      onAccept={onAccept}
      checkout={true}
      onCheckout={onClose}
    />,
  );
  return { user, onAccept, onClose };
};

afterEach(cleanup);

describe("Modal", () => {
  it("closes without accepting on Cancel", async () => {
    const { user, onAccept, onClose } = renderModal();

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
    expect(onAccept).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape", async () => {
    const { user, onAccept, onClose } = renderModal();

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalled();
    expect(onAccept).not.toHaveBeenCalled();
  });

  it("closes on a backdrop click but not on a click inside", async () => {
    const { user, onClose } = renderModal();

    await user.click(screen.getByText("Continue?"));
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole("dialog"));
    expect(onClose).toHaveBeenCalled();
  });

  it("keeps keyboard focus inside the modal", async () => {
    const { user } = renderModal();
    const buttons = screen.getAllByRole("button");
    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();

    last.focus();
    await user.tab();
    expect(first).toHaveFocus();

    await user.tab({ shift: true });
    expect(last).toHaveFocus();
  });

  it("uses a custom accept label", () => {
    render(
      <Modal
        title="Remove item"
        content="Remove it?"
        acceptLabel="Remove"
        onAccept={vi.fn()}
        checkout={true}
        onCheckout={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });
});
