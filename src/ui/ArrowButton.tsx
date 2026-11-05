import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export const ArrowButton = ({
  direction,
  color,
  handleClick,
  ariaLabel,
}: {
  direction: string;
  color: string;
  handleClick: () => void;
  ariaLabel?: string;
}) => {
  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center rounded-full ${color} h-[25px] w-[25px] active:scale-110 md:h-[35px] md:w-[35px]`}
    >
      {direction === "back" ? <IoMdArrowBack /> : <IoMdArrowForward />}
    </button>
  );
};
