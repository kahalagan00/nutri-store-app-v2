import toast from "react-hot-toast";
import { RiMapPinLine } from "react-icons/ri";

const Delivery: React.FC = () => {
  const handleClick = () => {
    toast("Delivery is under development", {
      icon: "🛠️ 📦",
    });
  };


  return (
    <div className="flex items-center justify-center gap-2 hover:brightness-125">
      <p className="font-lato text-center text-xs font-bold tracking-wide text-gray-600 dark:text-gray-100">
        Delivery to
      </p>
      <button onClick={handleClick}>
        <RiMapPinLine className="h-7 w-7" />
      </button>
      <p className="font-lato text-center text-xs font-bold tracking-wide text-gray-600 dark:text-gray-100">
        City, State
      </p>
    </div>
  );
};

export default Delivery;
