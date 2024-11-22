function Logo() {
  return (
    <div className="flex w-1/5 justify-evenly items-center">
      <div className="w-36 flex justify-center items-center">
        <img
          className="max-w-16 max-h-16"
          src="./src/assets/company-logo-2.svg"
          alt="Comapny logo"
        />
      </div>
      <div className="pl-4">
        <h1 className="text-2xl font-bold font-neuton ">Jhuv</h1>
        <h1 className="text-md text-blue-500 font-lato tracking-wide">
          Nutrition
        </h1>
      </div>
    </div>
  );
}

export default Logo;
