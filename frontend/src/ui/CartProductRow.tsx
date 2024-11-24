const CartProductRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-2 grid h-[150px] grid-cols-[400px_100px_100px_100px] items-center gap-x-4 overflow-hidden border-b-2 border-b-slate-300">
      {children}
    </div>
  );
};

export default CartProductRow;
