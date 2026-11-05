import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { IoMdHeartEmpty, IoMdMoon, IoMdSunny } from "react-icons/io";
import { FiMoon, FiSun } from "react-icons/fi";

const LikedMenu: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const handleClick = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={handleClick}>
      {!isDarkMode ? (
        <FiSun className="h-10 w-10 rounded-full p-2 hover:bg-gray-300" />
      ) : (
        <FiMoon className="h-10 w-10 rounded-full p-2 hover:bg-gray-500" />
      )}
    </button>
  );
};

export default LikedMenu;
