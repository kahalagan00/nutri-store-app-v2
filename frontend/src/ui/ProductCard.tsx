import { IoMdCart, IoMdHeartEmpty } from "react-icons/io";

interface ProductCard {
  name: string;
  image: string;
  price: number;
  purpose: string;
  ingredients: string[];
  warnings: string[];
  stockQuantity: number;
  availability: boolean;
}

const ProductCard: React.FC<ProductCard> = ({
  name,
  image,
  price,
  purpose,
  ingredients,
  warnings,
  stockQuantity,
  availability,
}) => {
  // Fetch getAll product information

  return (
    <div className="rounded-lg border border-gray-300 bg-white w-72 h-96 flex flex-col justify-evenly">
      <div className="flex justify-between px-4">
        <p>25%</p>
        <IoMdHeartEmpty className="h-6 w-6" />
      </div>
      <div className="h-2/5">
        <p>Image: {image}</p>
      </div>
      <div>
        <p>{purpose}</p>
        <h1 className="text-lg">{name}</h1>
        <p>{price}</p>
      </div>
      <div>
        <p>
          Stock: {stockQuantity} Available: {`${availability ? "Yes" : "No"}`}
        </p>
      </div>
      <div>
        <IoMdCart />
      </div>
    </div>
  );
};

export default ProductCard;
