import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

// Shows telephone and email information about the company
function ContactPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">Contact</h1>
      <div className="font-lato mx-auto flex w-full pb-16">
        <div className="hidden w-[45%] flex-col items-start justify-center gap-8 md:flex">
          <img
            className="h-full w-4/5 object-contain drop-shadow-xl"
            src="/images/contact_page/0.jpg"
            alt="Picture of snowman with sale sign"
          />
          <img
            className="h-full w-4/5 object-contain drop-shadow-xl"
            src="/images/contact_page/1.jpg"
            alt="Picture of snowman with sale sign"
          />
        </div>

        <div className="flex w-full flex-col justify-start md:w-[50%]">
          <h1 className="font-neuton text-[20px] leading-9 tracking-wide lg:text-[40px]">
            Phone: &nbsp;
            <span className="text-blue-600">+1-702-GET-JHUV</span>
          </h1>
          <h1 className="font-neuton mt-4 text-[20px] leading-9 tracking-wide lg:text-[40px]">
            Email: &nbsp;
            <span className="text-blue-600">jhuvNutri@vegas.com.us</span>
          </h1>
          <p className="line mt-6 text-sm leading-5 tracking-normal text-gray-400">
            In addition to assisting with product inquiries or order tracking,
            our support team is happy to help with personalized recommendations,
            supplement usage guidance, or clarifying our policies and
            promotions. Whether you need advice on which product suits your
            needs or more details about ongoing discounts, we’re here to provide
            clarity and solutions. Your feedback is also valuable to us—if you
            have suggestions or ideas on how we can improve, feel free to share
            them when you contact us. We’re dedicated to ensuring your journey
            toward better health is supported every step of the way!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
