import { IoMdHeartEmpty } from "react-icons/io";

const LikedMenu: React.FC = () => {
  return (
    <button disabled={true}>
      <IoMdHeartEmpty className="h-6 w-6" />
    </button>
  );
};

export default LikedMenu;
