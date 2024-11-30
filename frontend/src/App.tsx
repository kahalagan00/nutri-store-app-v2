import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import PromotionsPage from "./pages/PromotionsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import PageNotFoundPage from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "./utils/constants";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import BlogsPage from "./pages/BlogsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AccountPage from "./pages/AccountPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      // refetchOnWindowFocus: false, refetchOnReconnect: false
      staleTime: 0,
    },
  },
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/users/user`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("There is no user");
        }

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        console.error("Log in needed");
      }
    };

    validateToken();
  }, []);

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <GlobalStyles /> Add later on */}
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route
              element={
                <AppLayout
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            >
              <Route index element={<Navigate replace to="home" />}></Route>
              <Route
                path="account"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirectPath="/"
                  >
                    <AccountPage />
                  </ProtectedRoute>
                }
              />
              <Route path="home" element={<HomePage />} />
              <Route path="products" element={<ProductPage />} />
              <Route
                path="cart"
                element={<CartPage isAuthenticated={isAuthenticated} />}
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="promotions" element={<PromotionsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="blogs" element={<BlogsPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            {/* Redirect authenticated users away from login and signup */}
            <Route
              path="login"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirectPath="/"
                >
                  <LoginPage setIsAuthenticated={setIsAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="signup"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirectPath="/"
                >
                  <SignUpPage setIsAuthenticated={setIsAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="forgotPassword"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirectPath="/"
                >
                  <ForgotPasswordPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFoundPage />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000, // 3 seconds
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
          }}
        />
      </QueryClientProvider>
    </CartProvider>
  );
};

export default App;
