const CartProductRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-2 flex grid-cols-[200px_100px_100px_100px] flex-col items-start items-center gap-x-4 overflow-hidden border-b-2 border-b-slate-300 sm:grid sm:items-center lg:h-[150px] lg:grid-cols-[400px_100px_100px_100px]">
      {children}
    </div>
  );
};

export default CartProductRow;
