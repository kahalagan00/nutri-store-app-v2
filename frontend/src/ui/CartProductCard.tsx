const CartProductCard = ({
  image,
  name,
  purpose,
  productId,
  handleRemoveFromCart,
}: {
  image: string;
  name: string;
  purpose: string;
  productId: string;
  handleRemoveFromCart: (productId: string) => void;
}) => {
  return (
    <div className="flex grid-cols-[150px_180px] flex-col items-center lg:grid lg:h-[150px] lg:items-start">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-white drop-shadow-md lg:mb-0 lg:mr-4 lg:h-[90%] lg:w-[80%]">
        <img src={`/images/products/${image}`} alt={`Image of ${name}`} />
      </div>
      <div className="flex flex-col items-center justify-start lg:items-start">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-500">
          {purpose}
        </p>
        <p className="font-neuton text-lg font-semibold lg:mb-4 lg:text-xl">
          {name}
        </p>
        <button
          onClick={() => handleRemoveFromCart(productId)}
          className="font-lato mb-2 rounded-full px-2 py-1 text-[11px] uppercase tracking-wide text-rose-500 hover:bg-rose-500 hover:text-white lg:-translate-x-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;
