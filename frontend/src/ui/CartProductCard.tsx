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
    <div className="flex h-[160px] grid-cols-[150px_180px] flex-col items-center lg:grid lg:h-[150px] lg:items-start">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-white drop-shadow-md lg:mb-0 lg:mr-4 lg:h-[90%] lg:w-[80%]">
        <img src={`/images/products/${image}`} alt={`Image of ${name}`} />
      </div>
      <div className="flex flex-col items-center justify-center lg:items-start">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-500">
          {purpose}
        </p>
        <p className="font-neuton mb-12 text-xl font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default CartProductCard;
