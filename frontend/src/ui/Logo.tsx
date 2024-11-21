function Logo() {
  return (
    <div className="h-full flex w-1/5 justify-evenly items-center">
      <div className="h-36 w-36 flex justify-center items-center">
        <img
          className="max-w-16 max-h-16"
          src="./src/assets/company-logo-2.svg"
          alt="Comapny logo"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Jhuv</h1>
        <h1 className="text-xl font-semibold text-blue-500">Nutrition</h1>
      </div>
    </div>
  );
}

export default Logo;
