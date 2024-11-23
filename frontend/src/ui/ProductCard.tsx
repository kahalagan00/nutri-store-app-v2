import { useState } from "react";
import { IoMdAdd, IoMdCart, IoMdHeartEmpty, IoMdRemove } from "react-icons/io";
import { useUpdateCart } from "../features/cart/useUpdateCart";

interface ProductCard {
  _id: string;
  name: string;
  image: string;
  price: number;
  purpose: string;
  ingredients: string[];
  warnings: string[];
  stockQuantity: number;
  availability: boolean;
}

const ProductCard: React.FC<ProductCard> = ({
  _id,
  name,
  image,
  price,
  purpose,
  ingredients,
  warnings,
  stockQuantity,
  availability,
}) => {
  const [bagAmount, setBagAmount] = useState(1);

  const handleAddBagAmount = () => {
    setBagAmount((bagAmount) => bagAmount + 1);
  };
  const handleRemoveBagAmount = () => {
    if (bagAmount === 1) {
      return;
    }
    setBagAmount((bagAmount) => bagAmount - 1);
  };

  const addToCart = () => {
    const cart = useUpdateCart(_id, name, price, bagAmount);
    console.log(cart);
  };

  return (
    <div className="flex h-[25rem] w-72 flex-col justify-start overflow-hidden rounded-xl bg-white xl:border xl:border-gray-300">
      <div className="flex items-center justify-between pr-4 pt-4" id="pointer">
        <div className="flex w-16 -translate-x-1 -skew-x-12 items-center justify-center bg-rose-500 px-4 py-1">
          <p className="text-bold text-sm text-white">-25%</p>
        </div>
        <IoMdHeartEmpty className="h-7 w-7 cursor-pointer" />
      </div>
      <div className="flex h-3/5 items-center justify-center overflow-hidden">
        <img className="max-h-full" src={`./src/assets/${image}`} alt="" />
      </div>
      <div className="pl-4">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-400">
          {purpose}
        </p>
        <p className="font-neuton text-2xl font-semibold">{name}</p>
        <p className="font-neuton py-2 text-2xl font-normal text-blue-500">
          ${price}
        </p>
      </div>
      {/* <div>
        <p>
          Stock: {stockQuantity} Available: {`${availability ? "Yes" : "No"}`}
        </p>
      </div> */}
      <div className="flex items-center justify-between px-4 py-4">
        {stockQuantity !== 0 ? (
          <div className="bord grid h-8 w-32 grid-cols-3 place-items-center gap-3 rounded-md border-2 px-2">
            <button onClick={handleRemoveBagAmount}>
              <IoMdRemove />
            </button>
            <p className="flex h-full w-10 items-center justify-center bg-gray-200 text-xs">
              {bagAmount}
            </p>
            <button onClick={handleAddBagAmount}>
              <IoMdAdd />
            </button>
          </div>
        ) : (
          <p className="font-bold text-red-500">No stock</p>
        )}
        <button
          onClick={addToCart}
          disabled={stockQuantity === 0}
          className={`flex h-11 items-center justify-center rounded-full bg-blue-500 p-2.5 ${stockQuantity === 0 ? "opacity-50" : ""}`}
        >
          <IoMdCart className="h-full w-full text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
