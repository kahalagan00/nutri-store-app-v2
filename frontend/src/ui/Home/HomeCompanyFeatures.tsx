import { companyFeaturesData } from "../../data/companyFeaturesData";

const HomeCompanyFeatures: React.FC = () => {
  return (
    <div className="bg-white pt-4 dark:bg-slate-700">
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-6 border-b-2 border-b-gray-300 py-10 sm:grid-cols-2 lg:w-[70%] lg:grid-cols-4">
        {companyFeaturesData.map((feature, i) => (
          <FeatureBlock
            key={`${feature.message}${i}`}
            imageUrl={`/images/company_features/${feature.image}`}
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
    <div className="flex items-center gap-4">
      <div className="w-[50px] flex-shrink-0 rounded-lg dark:bg-slate-400 dark:p-2">
        <img className="w-full" src={imageUrl} alt="" />
      </div>
      <p className="font-neuton text-wrap text-sm font-bold leading-6 text-gray-600 dark:text-gray-100">
        {message}
      </p>
    </div>
  );
};
