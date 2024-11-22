import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchClick = () => {
    console.log(searchValue);
  };

  return (
    <div className="flex items-center">
      <input
        className="font-lato tracking-wide outline-none w-72 pl-4 bg-slate-100 rounded-md text-xs h-10"
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
        <FiSearch />
      </button>
    </div>
    // <div className="bg-slate-200 b flex justify-evenly rounded-sm h-8">
    //   <input type="text" placeholder="What are you looking for?" />
    //   <button>
    //     <FiSearch />
    //   </button>
    // </div>
  );
};

export default SearchBar;
