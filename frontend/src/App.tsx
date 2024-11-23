import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Promotions from "./pages/Promotions";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import { LOCAL_BACKEND_API } from "./utils/constants";
import ProtectedRoute from "./ui/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

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
        const res = await fetch(`${LOCAL_BACKEND_API}/users/user`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("There is no user");
        }

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
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
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            {/* Redirect authenticated users away from login and signup */}
            <Route
              path="login"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirectPath="/"
                >
                  <Login setIsAuthenticated={setIsAuthenticated} />
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
                  <SignUp setIsAuthenticated={setIsAuthenticated} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
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
              duration: 5000,
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
