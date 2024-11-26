const HomeAchievements: React.FC = () => {
  return (
    <div className="relative mx-auto flex w-full gap-x-8 pb-16">
      <img
        className="w-full"
        src="./src/assets/achievements/background.png"
        alt="Background image of achievements"
      />
      <div className="absolute inset-0 m-auto grid h-[40%] w-[70%] grid-cols-[repeat(4,_200px)] place-items-center gap-4">
        <AchievementCard
          numberFigure="10"
          message="Supplement Categories"
          imageUrl="./src/assets/achievements/categories.svg"
        />
        <AchievementCard
          numberFigure="50"
          message="Active Products"
          imageUrl="./src/assets/achievements/products.svg"
        />
        <AchievementCard
          numberFigure="500"
          message="Awards Won"
          imageUrl="./src/assets/achievements/awards.svg"
        />
        <AchievementCard
          numberFigure="22,900"
          message="Satisfied Clients"
          imageUrl="./src/assets/achievements/clients.svg"
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
