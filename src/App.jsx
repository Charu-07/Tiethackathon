import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// === COMPONENTS ===
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// === PAGES ===
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import Strategy from "./pages/Strategy"; // Your new Strategy page
import Guidelines from './pages/Guidelines';
import FishInfo from "./pages/FishInfo";
import Contact from "./pages/Contact";
import SellFishes from "./pages/SellFishes";

/* === LAYOUT WRAPPER ===
   This component checks the current URL.
   If it's an Auth page (Login/Signup), it hides the Navbar.
   Otherwise, it shows the Navbar globally.
*/
function Layout({ children }) {
  const location = useLocation();

  // List of routes where the Navbar should be HIDDEN
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
  // Check for token to handle initial redirects
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      {/* Layout must be inside BrowserRouter to use useLocation() */}
      <Layout>
        <Routes>
          
          {/* === DEFAULT ROUTE === */}
          {/* Redirects to Dashboard if logged in, otherwise Login */}
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />

          {/* === PUBLIC ROUTES === */}
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fish-info" element={<FishInfo />} />
          
          {/* === AUTH ROUTES (Navbar Hidden) === */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          
          {/* === PROTECTED ROUTES (Login Required) === */}
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
          
          {/* Optional: Handle old '/vessel' link by redirecting to '/strategy' */}
          <Route path="/vessel" element={<Navigate to="/strategy" />} />

          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <SellFishes />
              </ProtectedRoute>
            }
          />

          {/* === FALLBACK (404) === */}
          {/* Redirect unknown URLs to Home/Login */}
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}