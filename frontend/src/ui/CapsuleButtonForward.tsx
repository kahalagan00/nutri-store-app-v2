import { IoMdArrowForward } from "react-icons/io";

export const CapsuleButtonForward = ({ message }: { message: string }) => {
  return (
    <div className="grid h-[30px] w-[100px] grid-cols-[1fr_20px] items-center rounded-full bg-blue-600 px-1 md:h-[45px] md:w-[150px] md:px-4">
      <p className="font-lato justify-self-center text-[10px] font-bold text-white md:text-sm">
        {message}
      </p>
      <button className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center justify-self-center rounded-full bg-white md:h-[35px] md:w-[35px]">
        <IoMdArrowForward className="h-[60px]" />
      </button>
    </div>
  );
};
