const HomeMobileAppAdvert: React.FC = () => {
  return (
    <div className="mx-auto my-16 flex h-[450px] w-[70%] overflow-hidden rounded-xl bg-blue-400">
      <div className="flex w-full flex-col justify-evenly p-8 md:w-[60%]">
        <h1 className="leading-11 font-neuton w-full text-[30px] font-bold text-white lg:text-[40px]">
          Download Jhuv Nutri Mobile App
        </h1>

        <p className="font-lato text-white">
          Download our mobile app for easy access to top-quality supplements,
          personalized recommendations, and exclusive wellness tips—anytime,
          anywhere!
        </p>
        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
          <DownloadButton
            imageUrl="/images/mobile_advert/apple-logo.svg"
            name="App Store"
          />
          <DownloadButton
            imageUrl="/images/mobile_advert/googleplay-logo.svg"
            name="Google Play"
          />
        </div>
      </div>
      <div className="hidden h-full w-[40%] md:block">
        <img
          className="h-full w-full object-cover"
          src="/images/mobile_advert/mobile-app.png"
          alt="Mobile phone with app held by hand"
        />
      </div>
    </div>
  );
};

export default HomeMobileAppAdvert;

const DownloadButton = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => {
  return (
    <button className="grid h-full w-[180px] grid-cols-[50px_100px] place-items-center rounded-xl bg-black px-2 py-4">
      <img
        className="h-[35px] w-[35px]"
        src={imageUrl}
        alt={`Image of ${name}`}
      />
      <p className="text-lg font-semibold text-white">{name}</p>
    </button>
  );
};
