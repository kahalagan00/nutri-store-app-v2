import { NavLink } from "react-router-dom";
import { CapsuleButtonRegular } from "../CapsuleButtonRegular";
import { curatedCategoryData } from "../../data/curatedCategoryData";

const HomeCuratedCategories: React.FC = () => {
  return (
    <div className="mx-auto w-[90%] py-16">
      <div className="grid h-full w-full grid-cols-[repeat(auto-fit,minmax(min(350px,100%),1fr))] gap-5">
        {curatedCategoryData.map((data) => (
          <CuratedCategoryCard
            key={data.message}
            title={data.title}
            message={data.message}
            imageUrl={`/images/curated_categories/${data.image}`}
            bgColor={data.bgColor}
            textColor={data.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCuratedCategories;

const CuratedCategoryCard = ({
  bgColor,
  textColor,
  title,
  message,
  imageUrl,
}: {
  bgColor: string;
  textColor: string;
  title: string;
  message: string;
  imageUrl: string;
}) => {
  return (
    <div
      className={`font-lato min-h-[250px] w-full ${bgColor} flex gap-4 rounded-xl dark:brightness-90`}
    >
      <div className="flex w-[50%] flex-col items-start justify-evenly pl-8">
        <p className={`${textColor} text-sm uppercase`}>{title}</p>
        <p className={`${textColor} text-2xl font-bold`}>{message}</p>
        <NavLink to="/products">
          <CapsuleButtonRegular
            buttonColor="bg-white"
            textColor="text-black"
            text="See All"
          />
        </NavLink>
      </div>
      <div className="flex w-[50%] items-center justify-center p-2">
        <img
          className="h-full w-full object-contain"
          src={imageUrl}
          alt={message}
        />
      </div>
    </div>
  );
};
