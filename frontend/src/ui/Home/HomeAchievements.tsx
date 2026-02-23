const HomeAchievements: React.FC = () => {
  return (
    <div className="relative mx-auto flex h-[400px] w-full gap-x-8 bg-black lg:h-auto">
      <img
        className="w-full object-contain"
        src="/images/achievements/background.png"
        alt="Background image of achievements"
      />
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col place-items-center gap-4 lg:grid lg:grid-cols-[repeat(4,_200px)]">
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
      <img src={`${imageUrl}`} alt={`Image of ${message}`} />
      <div>
        <h1 className="font-neuton mb-1 text-4xl text-white">
          {numberFigure}&nbsp;<span className="text-rose-600">+</span>
        </h1>
        <p className="font-lato text-xs font-bold text-white">{message}</p>
      </div>
    </div>
  );
};
