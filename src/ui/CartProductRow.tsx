const CartProductRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-4 flex grid-cols-[minmax(0,200px)_100px_100px_100px] flex-col items-center gap-x-4 overflow-hidden border-b-2 border-b-slate-300 pb-4 sm:grid sm:items-center sm:pb-0 md:mb-2 lg:min-h-[150px] lg:grid-cols-[minmax(0,400px)_100px_100px_100px]">
      {children}
    </div>
  );
};

export default CartProductRow;
