import { useState } from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchClick = () => {
    // console.log(searchValue);
    toast("Search bar is under development", {
      icon: "🛠️ 🔎",
    });
  };

  return (
    <div className="flex items-center">
      <input
        disabled={true}
        className="font-lato hidden h-10 w-full min-w-[220px] rounded-md bg-slate-100 pl-4 text-xs tracking-wide outline-none md:block"
        type="text"
        placeholder="What are you looking for"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="submit"
        className="md:-translate-x-8"
        onClick={handleSearchClick}
      >
        <FiSearch className="h-7 w-7" />
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
