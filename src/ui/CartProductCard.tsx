import { useState } from "react";
import { ASSETS_R2_URL } from "../utils/constants";

const CartProductCard = ({
  image,
  name,
  purpose,
  productId,
  handleRemoveFromCart,
  isRemoving,
}: {
  image: string;
  name: string;
  purpose: string;
  productId: string;
  handleRemoveFromCart: (productId: string) => void;
  isRemoving: boolean;
}) => {
  const [isImageBroken, setIsImageBroken] = useState(false);

  return (
    <div className="flex grid-cols-[150px_180px] flex-col items-center lg:grid lg:min-h-[150px] lg:items-start">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-white drop-shadow-md lg:mb-0 lg:mr-4 lg:h-[135px] lg:w-[120px]">
        {isImageBroken ? (
          <span className="font-lato text-xs text-gray-400">No image</span>
        ) : (
          <img
            className="max-h-full max-w-full object-contain"
            src={`${ASSETS_R2_URL}/products/${image}`}
            alt={`Image of ${name}`}
            onError={() => setIsImageBroken(true)}
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-start lg:items-start">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-200">
          {purpose}
        </p>
        <p className="font-neuton break-words text-lg font-semibold lg:mb-4 lg:text-xl dark:text-gray-50">
          {name}
        </p>
        <button
          onClick={() => handleRemoveFromCart(productId)}
          disabled={isRemoving}
          className={`font-lato mb-2 rounded-full px-2 py-1 text-[11px] uppercase tracking-wide text-rose-500 hover:bg-rose-500 hover:text-white lg:-translate-x-2 ${isRemoving ? "opacity-40" : ""}`}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
