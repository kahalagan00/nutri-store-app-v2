const CartProductCard = ({
  image,
  name,
  purpose,
}: {
  image: string;
  name: string;
  purpose: string;
}) => {
  return (
    <div className="grid h-[150px] grid-cols-[150px_180px]">
      <div className="mr-4 flex h-[90%] w-[80%] items-center justify-center rounded-lg bg-slate-300">
        <img src={`./src/assets/${image}`} alt={`Image of ${name}`} />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-400">
          {purpose}
        </p>
        <p className="font-neuton mb-12 text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default CartProductCard;