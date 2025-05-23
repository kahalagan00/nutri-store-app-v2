import { IoMdCalendar, IoMdLock, IoMdMail, IoMdPerson } from "react-icons/io";
import { BACKEND_URL, PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { updatePasswordUserApi } from "../services/apiUsers";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  passwordChangedAt: Date;
  role: string;
  slug: string;
  symptoms: string[];
};

// Shows the summary of the user information and gives the option to change user password
function AccountPage() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [user, setCurrentUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/users/user`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message ||
              "Something went wrong when trying to get current user",
          );
        }

        const { data } = await res.json();

        setCurrentUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  const dateOfBirth: Date | undefined = user?.dateOfBirth; // Assuming receivedDate might be undefined
  let formattedBirthday;
  if (dateOfBirth) {
    formattedBirthday = new Date(dateOfBirth).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } else {
    formattedBirthday = "Not specified";
  }

  const handleSubmit = async () => {
    if (newPassword.length < 8 || currentPassword.length < 8) {
      toast.error("Please enter at least 8 characters for the passwords");
      return;
    }
    await updatePasswordUserApi(currentPassword, newPassword, newPassword);
    navigate("/");
    // console.log(currentPassword, newPassword);
  };

  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Account
      </h1>
      <div className="my-12 grid gap-10 lg:grid-cols-[300px_1fr]">
        <div className="hidden lg:flex lg:flex-col">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-rose-400">
            <img
              className="h-[60%]"
              src="/images/account_page/default_user.png"
              alt="Image of default user"
            />
          </div>
          <h1 className="font-lato mt-4 text-3xl font-bold dark:text-gray-50">
            {user?.name}
          </h1>
          <p className="font-lato mt-2 text-gray-500 dark:text-gray-200">
            {user?.email}
          </p>
          <h1 className="font-lato mt-8 text-2xl text-gray-600 dark:text-gray-100">
            Personal Information
          </h1>

          {/* Implement other account information later on */}
          {/* <h1 className="font-lato text-2xl text-gray-600">
            Billings & Payments
          </h1>
          <h1 className="font-lato text-2xl text-gray-600">Order History</h1>
          <h1 className="font-lato text-2xl text-gray-600">Gift Cards</h1> */}
        </div>

        <div className="">
          <h1 className="font-lato mt-2 text-4xl font-bold dark:text-gray-100">
            Personal Information
          </h1>
          <p className="font-lato mb-12 mt-2 text-gray-500 dark:text-gray-200">
            Manage your personal information, including phone numbers, email
            address, and password.
          </p>
          <div className="mt-4 grid gap-8 md:grid-cols-2">
            <div className="flex h-[100px] w-full items-center justify-between rounded-lg border-2 bg-blue-50 p-6 dark:border-none dark:bg-slate-800">
              <div>
                <p className="font-lato mb-1 mt-2 text-xl font-bold dark:text-gray-50">
                  Name
                </p>
                <p className="font-lato text-gray-500 dark:text-gray-200">
                  {user?.name}
                </p>
              </div>
              <IoMdPerson className="h-7 w-7 text-rose-400" />
            </div>
            <div className="flex h-[100px] w-full items-center justify-between rounded-lg border-2 bg-blue-50 p-6 dark:border-none dark:bg-slate-800">
              <div>
                <p className="font-lato mb-1 mt-2 text-xl font-bold dark:text-gray-50">
                  Date of Birth
                </p>
                <p className="font-lato text-gray-500 dark:text-gray-200">
                  {formattedBirthday}
                </p>
              </div>
              <IoMdCalendar className="h-7 w-7 text-rose-400" />
            </div>
            <div className="flex h-[100px] w-full items-center justify-between rounded-lg border-2 bg-blue-50 p-6 dark:border-none dark:bg-slate-800">
              <div>
                <p className="font-lato mb-1 mt-2 text-xl font-bold dark:text-gray-50">
                  Email
                </p>
                <p className="font-lato text-gray-500 dark:text-gray-200">
                  {user?.email}
                </p>
              </div>
              <IoMdMail className="h-7 w-7 text-rose-400" />
            </div>
            <div>
              <div className="flex h-[100px] w-full items-center justify-between rounded-lg border-2 bg-blue-50 p-6 dark:border-none dark:bg-slate-800">
                <div className="flex flex-col">
                  <input
                    type="password"
                    className="font-lato mb-2 border-b-2 border-b-gray-600 bg-transparent outline-none dark:text-gray-200"
                    placeholder="Enter current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="font-lato border-b-2 border-b-gray-600 bg-transparent outline-none dark:text-gray-200"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <IoMdLock className="h-7 w-7 text-rose-400" />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="font-lato mt-2 rounded-xl bg-blue-500 p-2 text-white dark:bg-cyan-400 dark:text-slate-900 hover:dark:bg-cyan-300"
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
