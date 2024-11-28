import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

function BlogsPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">
        Blogs Page Under Development...
      </h1>
      <img
        className="my-16 h-1/2 w-1/2"
        src="./public/images/under_development.svg
        "
        alt="Image of under development"
      />
    </div>
  );
}

export default BlogsPage;
