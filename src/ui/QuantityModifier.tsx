import { IoMdAdd, IoMdRemove } from "react-icons/io";

const QuantityModifier = ({
  onClickDecrement,
  number,
  onClickIncrement,
  productName,
}: {
  onClickDecrement: () => void;
  number: number;
  onClickIncrement: () => void;
  productName: string;
}) => {
  return (
    <div className="flex items-center self-center rounded-md border-2 border-gray-300 bg-slate-100">
      <button
        type="button"
        aria-label={`Decrease quantity of ${productName}`}
        className="flex h-10 w-10 items-center justify-center"
        onClick={onClickDecrement}
      >
        <IoMdRemove />
      </button>
      <p className="flex h-7 w-9 items-center justify-center bg-gray-300 text-xs">
        {number}
      </p>
      <button
        type="button"
        aria-label={`Increase quantity of ${productName}`}
        className="flex h-10 w-10 items-center justify-center"
        onClick={onClickIncrement}
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default QuantityModifier;
