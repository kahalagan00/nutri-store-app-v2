function Logo() {
  return (
    <div className="flex w-full items-center justify-start">
      <div className="flex w-16 items-center justify-center">
        <img
          className="max-h-16 max-w-16"
          src="/images/company-logo-2.svg"
          alt="Company logo"
        />
      </div>
      <div className="pl-4">
        <h1 className="font-neuton text-2xl font-bold dark:text-gray-50">
          Jhuv
        </h1>
        <h1 className="font-lato text-base tracking-wide text-blue-500 dark:text-cyan-400">
          Nutrition
        </h1>
      </div>
    </div>
  );
}

export default Logo;
