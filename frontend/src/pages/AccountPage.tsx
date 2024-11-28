import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

function AccountPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">Account</h1>
      <div className="grid grid-cols-[300px_1fr] gap-10">
        <div className="flex flex-col">
          <div className="h-28 w-28 rounded-full bg-rose-400"></div>
          <h1 className="font-lato mt-2 text-3xl font-bold">Full Name</h1>
          <p className="font-lato text-sm text-gray-500">Email</p>
          <h1 className="font-lato mt-8 text-2xl text-gray-600">
            Personal Information
          </h1>
          <h1 className="font-lato text-2xl text-gray-600">
            Billings & Payments
          </h1>
          <h1 className="font-lato text-2xl text-gray-600">Order Histroy</h1>
          <h1 className="font-lato text-2xl text-gray-600">Gift Cards</h1>
        </div>

        <div className="">
          <h1 className="font-lato mt-2 text-4xl font-bold">
            Personal Information
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
