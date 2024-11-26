import { PAYMENT_METHODS_SRC } from "../utils/constants";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mx-auto w-[90%] bg-slate-800 pb-16 text-3xl">
      {/* Top Footer */}
      <div className="h-[400px] rounded-2xl bg-rose-100 p-16 text-black">
        <div>Block 1</div>
        <div>Block 2</div>
        <div>Block 3</div>
        <div>Block 4</div>
      </div>

      {/* Bottom footer */}
      <div className="font-lato flex h-[50px] items-center justify-between bg-white text-xs font-semibold text-gray-400">
        <p>&copy;&nbsp;{currentYear} Jhuv Nutrition</p>
        <div className="flex w-[40%] justify-evenly">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Cookies/Ad Choices</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <PaymentMethodCard name="mastercard" />
          <PaymentMethodCard name="visa" />
          <PaymentMethodCard name="amex" />
          <PaymentMethodCard name="discover" />
          <PaymentMethodCard name="paypal" />
          <PaymentMethodCard name="afterpay" />
          <PaymentMethodCard name="klarna" />
          <PaymentMethodCard name="zip" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

const PaymentMethodCard = ({ name }: { name: string }) => {
  return (
    <div className="h-[30px] max-w-[60px]">
      <img
        className="h-full object-contain"
        src={`${PAYMENT_METHODS_SRC}/${name}.png`}
        alt=""
      />
    </div>
  );
};
