import { RiMapPinLine } from "react-icons/ri";

const Delivery: React.FC = () => {
  return (
    <div className="flex justify-center gap-2 items-center">
      <p className="tracking-wide text-xs font-lato font-bold text-gray-600">
        Delivery to
      </p>
      <RiMapPinLine className="h-5 w-5" />
      <p className="tracking-wide text-xs font-lato font-bold text-gray-600">
        City, State
      </p>
    </div>
  );
};

export default Delivery;
