import { RiMapPinLine } from "react-icons/ri";

const Delivery: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 hover:brightness-125">
      <p className="font-lato text-xs font-bold tracking-wide text-gray-600">
        Delivery to
      </p>
      <button>
        <RiMapPinLine className="h-5 w-5" />
      </button>
      <p className="font-lato text-xs font-bold tracking-wide text-gray-600">
        City, State
      </p>
    </div>
  );
};

export default Delivery;
