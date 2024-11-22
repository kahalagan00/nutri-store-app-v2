import { useState } from "react";
import { IoMdAdd, IoMdCart, IoMdHeartEmpty, IoMdRemove } from "react-icons/io";

interface ProductCard {
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
    console.log(`User wants to add ${bagAmount} of ${name} in the cart`);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white w-72 h-[25rem] flex flex-col justify-start overflow-hidden">
      <div className="flex justify-between items-center pr-4 pt-4" id="pointer">
        <div className="bg-rose-500 w-16 px-4 py-1 -skew-x-12 -translate-x-1 flex justify-center items-center">
          <p className="text-white text-bold text-sm">-25%</p>
        </div>
        <IoMdHeartEmpty className="h-7 w-7 cursor-pointer" />
      </div>
      <div className="h-3/5 overflow-hidden flex justify-center items-center">
        <img className="max-h-full" src={`./src/assets/${image}`} alt="" />
      </div>
      <div className="pl-4">
        <p className="font-lato tracking-wide uppercase text-gray-400 text-xs font-semibold">
          {purpose}
        </p>
        <p className="text-2xl font-semibold font-neuton">{name}</p>
        <p className="py-2 text-2xl text-blue-500 font-normal font-neuton">
          ${price}
        </p>
      </div>
      {/* <div>
        <p>
          Stock: {stockQuantity} Available: {`${availability ? "Yes" : "No"}`}
        </p>
      </div> */}
      <div className="flex justify-between px-4 py-4 items-center">
        <div className="grid grid-cols-3 gap-3 border-2 bord rounded-md w-32 h-8 px-2 place-items-center">
          <button onClick={handleRemoveBagAmount}>
            <IoMdRemove />
          </button>
          <p className="h-full text-xs w-10 bg-gray-200 flex items-center justify-center">
            {bagAmount}
          </p>
          <button onClick={handleAddBagAmount}>
            <IoMdAdd />
          </button>
        </div>
        <button
          onClick={addToCart}
          disabled={false}
          className={`bg-blue-500 rounded-full flex justify-center items-center p-2.5 h-11`}
        >
          <IoMdCart className="text-white h-full w-full" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
