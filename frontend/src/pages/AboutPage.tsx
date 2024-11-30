import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

// About page that shows what the company is about in great detail.
function AboutPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">About us</h1>
      <div className="font-lato mx-auto flex w-full pb-16">
        <div className="hidden w-[45%] flex-col items-start justify-center gap-8 md:flex">
          <img
            className="h-full w-4/5 object-contain drop-shadow-xl"
            src="/images/about_page/0.jpg"
            alt="Picture of cows in a farm"
          />
          <img
            className="h-full w-4/5 object-contain drop-shadow-xl"
            src="/images/about_page/1.jpg"
            alt="Pharmacist helping client"
          />
        </div>

        <div className="flex w-full flex-col justify-start md:w-[50%]">
          <p className="text-sm font-bold uppercase text-blue-500">about us</p>
          <h1 className="font-neuton text-[30px] leading-9 lg:text-[40px]">
            We are dedicated to collaborating with accredited pharmacists and
            trusted farmers.
          </h1>
          <p className="line mt-6 text-sm leading-5 tracking-normal text-gray-400">
            At Jhuv Nutrition, we believe that good health starts with
            trust—trust in the quality of our products and the integrity of our
            process. That’s why we are dedicated to collaborating with
            accredited pharmacists and trusted farmers who share our commitment
            to excellence. By combining the expertise of pharmacists with the
            care and responsibility of farmers, we ensure that every product is
            formulated to meet the highest standards of safety and
            effectiveness.
          </p>
          <p className="line mt-6 text-sm leading-5 tracking-normal text-gray-400">
            Our partnership with accredited pharmacists ensures that the science
            behind every supplement is sound and thoroughly vetted. From
            selecting the right ingredients to optimizing formulations, we work
            with professionals who understand the science of nutrition and its
            impact on your well-being. Meanwhile, our collaboration with trusted
            farmers guarantees that the ingredients we use are responsibly
            sourced, natural, and of the highest quality, reflecting our respect
            for both people and the planet.
          </p>
          <p className="line mt-6 text-sm leading-5 tracking-normal text-gray-400">
            At Jhuv Nutrition, our mission goes beyond providing
            supplements—it’s about empowering healthier, happier lifestyles.
            Whether you’re seeking to improve your energy, boost immunity, or
            enhance overall wellness, our products are crafted with you in mind.
            With a focus on purity, safety, and effectiveness, we are here to
            support your health journey with solutions you can rely on, every
            step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
