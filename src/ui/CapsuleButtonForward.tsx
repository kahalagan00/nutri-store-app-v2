import { IoMdArrowForward } from "react-icons/io";

export const CapsuleButtonForward = ({ message }: { message: string }) => {
  return (
    <div className="grid h-[21px] w-[75px] grid-cols-[1fr_20px] items-center rounded-full bg-blue-600 px-1 sm:h-[30px] sm:w-[100px] md:h-[45px] md:w-[150px] md:px-4 dark:bg-cyan-600">
      <p className="font-lato justify-self-center text-[8px] font-bold text-white sm:text-[10px] md:text-sm">
        {message}
      </p>
      <button className="flex h-[15px] w-[15px] cursor-pointer items-center justify-center justify-self-center rounded-full bg-white active:scale-105 sm:h-[20px] sm:w-[20px] md:h-[35px] md:w-[35px]">
        <IoMdArrowForward className="h-[60px]" />
      </button>
    </div>
  );
};
