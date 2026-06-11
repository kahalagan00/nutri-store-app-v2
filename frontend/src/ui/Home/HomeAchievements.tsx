const HomeAchievements: React.FC = () => {
  return (
    <div className="bg-black bg-[url('/images/achievements/background.png')] bg-cover bg-center">
      <div className="mx-auto grid w-[90%] max-w-5xl grid-cols-1 gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <AchievementCard
          numberFigure="10"
          message="Supplement Categories"
          imageUrl="/images/achievements/categories.svg"
        />
        <AchievementCard
          numberFigure="50"
          message="Active Products"
          imageUrl="/images/achievements/products.svg"
        />
        <AchievementCard
          numberFigure="500"
          message="Awards Won"
          imageUrl="/images/achievements/awards.svg"
        />
        <AchievementCard
          numberFigure="22,900"
          message="Satisfied Clients"
          imageUrl="/images/achievements/clients.svg"
        />
      </div>
    </div>
  );
};

export default HomeAchievements;

const AchievementCard = ({
  numberFigure,
  message,
  imageUrl,
}: {
  numberFigure: string;
  message: string;
  imageUrl: string;
}) => {
  return (
    <div className="grid w-full grid-cols-[50px_1fr] place-items-center justify-items-start gap-4">
      <img src={imageUrl} alt="" />
      <div>
        <h1 className="font-neuton mb-1 text-4xl text-white">
          {numberFigure}&nbsp;<span className="text-rose-600">+</span>
        </h1>
        <p className="font-lato text-xs font-bold text-white">{message}</p>
      </div>
    </div>
  );
};
