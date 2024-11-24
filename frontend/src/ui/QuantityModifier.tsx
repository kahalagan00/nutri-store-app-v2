import { IoMdAdd, IoMdRemove } from "react-icons/io";

const QuantityModifier = ({
  onClickDecrement,
  number,
  onClickIncrement,
}: {
  onClickDecrement: () => void;
  number: number;
  onClickIncrement: () => void;
}) => {
  return (
    <div className="bord grid h-8 w-28 grid-cols-3 place-items-center gap-3 self-center rounded-md border-2 px-2">
      <button onClick={onClickDecrement}>
        <IoMdRemove />
      </button>
      <p className="flex h-full w-9 items-center justify-center bg-gray-200 text-xs">
        {number}
      </p>
      <button onClick={onClickIncrement}>
        <IoMdAdd />
      </button>
    </div>
  );
};

export default QuantityModifier;
