import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SellFishes from "./pages/SellFishes";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Strategy from "./pages/Strategy";
import Guidelines from './pages/Guidelines';
import FishInfo from "./pages/FishInfo";
/* Wrapper to conditionally show Navbar */
function Layout({ children }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup", "/verify-otp"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />

          <Route path="/guidelines" element={<Guidelines />} />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/fish-info" element={<FishInfo />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/strategy"
            element={
              <ProtectedRoute>
                <Strategy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellFishes />
              </ProtectedRoute>
            }
          />


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
