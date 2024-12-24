import { Link } from "react-router-dom";
import {
  LOG_IN_BOX_STYLE,
  LOG_IN_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";

// Default page for routes that doesn't exist
function PageNotFound() {
  return (
    <div className={LOG_IN_SCREEN_BACKGROUND_STYLE}>
      <div className={LOG_IN_BOX_STYLE}>
        <h1 className="font-lato self-center text-center text-3xl tracking-wide dark:text-gray-50">
          This page could not be found :(
        </h1>
        <Link
          to="/"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-blue-800 text-white hover:bg-blue-700 dark:bg-cyan-400 dark:text-slate-900 hover:dark:bg-cyan-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
