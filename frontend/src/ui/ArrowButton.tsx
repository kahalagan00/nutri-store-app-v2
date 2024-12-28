import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export const ArrowButton = ({
  direction,
  color,
  handleClick,
}: {
  direction: string;
  color: string;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={false} // Button functionality will be implemented later on
      className={`flex items-center justify-center rounded-full ${color} h-[25px] w-[25px] active:scale-110 md:h-[35px] md:w-[35px]`}
    >
      {direction === "back" ? <IoMdArrowBack /> : <IoMdArrowForward />}
    </button>
  );
};
