import toast from "react-hot-toast";
import { IoMdHeartEmpty } from "react-icons/io";

const LikedMenu: React.FC = () => {
  const handleClick = () => {
    toast("Liked list is under development", {
      icon: "🛠️ ❤️",
    });
  };
  return (
    <button onClick={handleClick}>
      <IoMdHeartEmpty className="h-6 w-6 active:text-red-500" />
    </button>
  );
};

export default LikedMenu;
