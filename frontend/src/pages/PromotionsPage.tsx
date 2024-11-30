import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

// Shows store promotions and offers
function PromotionsPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">
        Promotions
      </h1>
      <div className="font-lato mx-auto flex w-full pb-16">
        <div className="hidden w-[45%] flex-col items-start justify-center gap-8 md:flex">
          <img
            className="h-full w-4/5 object-contain drop-shadow-xl"
            src="/images/promotions_page/0.jpg"
            alt="Picture of snowman with sale sign"
          />
        </div>

        <div className="flex w-full flex-col justify-start md:w-[50%]">
          <h1 className="font-neuton text-[30px] leading-9 tracking-wide lg:text-[40px]">
            Enter any code at checkout and get a discount between{" "}
            <span className="font-bold text-blue-600">5% to 20%</span> of your
            cart subtotal 🥳
          </h1>
          <p className="line mt-6 text-sm leading-5 tracking-normal text-gray-400">
            Please note that our discounts and promotions are subject to
            specific terms and conditions to ensure fairness and clarity.
            Discounts are valid only during the promotional period and may apply
            exclusively to selected items or categories as specified in the
            offer details. Unless stated otherwise, promotions cannot be
            combined with other discounts, offers, or rewards. Additionally,
            certain items, such as clearance or limited-edition products, may be
            excluded from discounts. We encourage you to review the terms
            associated with each promotion to make the most of your savings
            while shopping with us!
          </p>
        </div>
      </div>
    </div>
  );
}

export default PromotionsPage;
