const HomeMobileAppAdvert: React.FC = () => {
  return (
    <div className="mx-auto w-[90%] py-16">
      <div className="flex overflow-hidden rounded-xl bg-blue-400 md:min-h-[450px] dark:brightness-90">
        <div className="flex w-full flex-col justify-evenly gap-6 p-8 md:w-[60%]">
          <h1 className="font-neuton text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            Download Jhuv Nutri Mobile App
          </h1>

          <p className="font-lato text-sm text-white sm:text-base">
            Download our mobile app for easy access to top-quality supplements,
            personalized recommendations, and exclusive wellness tips—anytime,
            anywhere!
          </p>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2">
            <DownloadButton
              imageUrl="/images/mobile_advert/apple-logo.svg"
              name="App Store"
              href="https://www.apple.com/app-store/"
            />
            <DownloadButton
              imageUrl="/images/mobile_advert/googleplay-logo.svg"
              name="Google Play"
              href="https://play.google.com/store"
            />
          </div>
        </div>
        <div className="hidden w-[40%] md:block">
          <img
            className="h-full w-full object-cover"
            src="/images/mobile_advert/mobile-app.png"
            alt="Mobile phone with app held by hand"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMobileAppAdvert;

const DownloadButton = ({
  imageUrl,
  name,
  href,
}: {
  imageUrl: string;
  name: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download on ${name}`}
      className="grid w-[180px] grid-cols-[50px_1fr] place-items-center rounded-xl bg-black px-2 py-4"
    >
      <img className="h-[35px] w-[35px]" src={imageUrl} alt="" />
      <p className="text-lg font-semibold text-white">{name}</p>
    </a>
  );
};
