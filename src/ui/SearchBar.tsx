import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchClick = () => {
    console.log(
      `Redirecting to SearchResultsPage right now for searchValue = ${searchValue}`,
    );
  };

  return (
    <div className="flex items-center">
      <input
        disabled={false}
        className="font-lato h-10 w-full min-w-[220px] rounded-md bg-slate-100 pl-4 text-xs tracking-wide outline-none"
        type="text"
        placeholder="What are you looking for"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="submit"
        className="-translate-x-8"
        onClick={handleSearchClick}
      >
        <FiSearch className="h-7 w-7 text-black" />
      </button>
    </div>
  );
};

export default SearchBar;
