import { ReactNode } from "react";

type HomeSectionProps = {
  title?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

// Shared wrapper for homepage sections: consistent width, vertical rhythm,
// and heading style across the page
const HomeSection = ({
  title,
  align = "left",
  action,
  className = "",
  children,
}: HomeSectionProps) => {
  return (
    <section className={`mx-auto w-[90%] py-16 ${className}`}>
      {title && (
        <div
          className={`mb-8 flex items-center gap-4 ${
            align === "center"
              ? "justify-center text-center"
              : "justify-between"
          }`}
        >
          <h1 className="font-neuton text-3xl font-bold lg:text-4xl dark:text-gray-50">
            {title}
          </h1>
          {action}
        </div>
      )}
      {children}
    </section>
  );
};

export default HomeSection;
