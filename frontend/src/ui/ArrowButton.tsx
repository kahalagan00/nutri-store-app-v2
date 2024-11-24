import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

export const ArrowButton = ({
  direction,
  color,
}: {
  direction: string;
  color: string;
}) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full bg-${color}-500/50 h-[25px] w-[25px] md:h-[35px] md:w-[35px]`}
    >
      {direction === "back" ? <IoMdArrowBack /> : <IoMdArrowForward />}
    </button>
  );
};
