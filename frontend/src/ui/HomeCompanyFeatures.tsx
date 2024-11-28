const companyFeaturesData = [
  {
    image: "0.svg",
    message: "Product from organic farm",
  },
  {
    image: "1.svg",
    message: "Free home delivery",
  },
  {
    image: "2.svg",
    message: "Promotion of the week",
  },
  {
    image: "3.svg",
    message: "-25% discount on all fruits",
  },
];

const HomeCompanyFeatures: React.FC = () => {
  return (
    <div className="h-[350px] bg-white pt-4 lg:h-[250px]">
      <div className="mx-auto flex h-[300px] w-1/2 flex-col items-center justify-center border-b-2 border-b-gray-300 bg-white lg:grid lg:h-[200px] lg:w-[70%] lg:flex-none lg:grid-cols-4 lg:gap-x-4">
        {companyFeaturesData.map((feature, i) => (
          <FeatureBlock
            key={`${feature.message}${i}`}
            imageUrl={`./src/assets/company_features/${feature.image}`}
            message={feature.message}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCompanyFeatures;

const FeatureBlock = ({
  imageUrl,
  message,
}: {
  imageUrl: string;
  message: string;
}) => {
  return (
    <div className="grid h-full grid-cols-[50px_120px] items-center">
      <img className="w-full" src={imageUrl} alt="" />
      <p className="font-neuton ml-6 text-wrap text-sm font-bold leading-6 text-gray-600">
        {message}
      </p>
    </div>
  );
};
