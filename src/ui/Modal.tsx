import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  title: string;
  content: string;
  onAccept: () => void;
  acceptLabel?: string;
  // onDecline: () => void;
  checkout: boolean;
  onCheckout: (checkout: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  onAccept,
  acceptLabel = "Proceed",
  // onDecline,
  // checkout = false,
  onCheckout,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    onCheckout(false);
  };

  // Start on the safe action and give focus back to the opener on close
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    cancelRef.current?.focus();
    return () => opener?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleModal();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      // Keep keyboard focus inside the modal
      const buttons = dialogRef.current.querySelectorAll("button");
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      const active = document.activeElement;
      if (!dialogRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div>
      {/* Modal toggle button */}
      {/* <button
        onClick={toggleModal}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Toggle modal
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            // Only a click on the backdrop itself closes the modal
            if (e.target === e.currentTarget) toggleModal();
          }}
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg dark:bg-gray-700"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
              <h3
                id="modal-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {title}
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-3 w-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="space-y-4 p-4 md:p-5">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {content}
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex items-center rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600">
              <button
                onClick={() => {
                  onAccept();
                  toggleModal();
                }}
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {acceptLabel}
              </button>
              <button
                ref={cancelRef}
                onClick={toggleModal}
                type="button"
                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Cancel
              </button>
              {/* <button
                onClick={() => {
                  onDecline();
                  toggleModal();
                }}
                type="button"
                className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Decline
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
