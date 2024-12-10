import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";
import Spinner from "../ui/Spinner";
import { useCart } from "../context/CartContext";

const PaymentSuccessPage = () => {
  const { setCartNumber, setCartTotal, cartNumber } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation(); // React Router hook to access the URL
  const queryParams = new URLSearchParams(location.search); // Get query params from the URL
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/payment/payment-status/${sessionId}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        const result = await response.json();
        setPaymentStatus(result.status);

        if (result.status === "success") {
          const res2 = await fetch(`${BACKEND_URL}/carts/clear`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          });

          const data = await res2.json();

          if (!res2.ok) {
            throw new Error("Error when clearing the cart after payment");
          }

          console.log("Cleared Cart: ", data);

          setCartNumber(0);
          setCartTotal(0);
          localStorage.setItem("cartItems", JSON.stringify([]));
        }

        console.log(result);
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    if (sessionId && cartNumber > 0) {
      fetchPaymentStatus();
    }
  }, []);

  return (
    <div className="font-lato m-4 rounded-lg bg-blue-200 p-16 text-center text-lg">
      {paymentStatus ? (
        <h1>
          Payment {paymentStatus === "success" ? "Successful" : "Pending"}
        </h1>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default PaymentSuccessPage;
