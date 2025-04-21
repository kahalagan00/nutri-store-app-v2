import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

const SearchResultsPage: React.FC = () => {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Search Results
      </h1>
    </div>
  );
};

export default SearchResultsPage;
