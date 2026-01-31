import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import PremiumShopSetup from "./pages/ShopSetup";
import RetailerAuth from "./components/RetailerAuth";
import DemandCalendar from "./pages/DemandCalendar";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";


import OnboardingPage from "./pages/Onboarding";
import FestivalDemandCalendar from "./pages/DemandCalendar";
import ShopSetup from "./pages/ShopSetup";
import SmallStoreSetup from "./pages/SmallStoreSetup";
import LargeStoreSetup from "./pages/LargeStoreSetup";
import Analysis from "./pages/Analysis";
import ProductDemandSuggestions from "./pages/ProductDemandSuggestions";
import InventoryUpload from "./pages/InventoryUpload";
import Calender from "./pages/Calender";
import EndOfDayEntry from "./pages/endOfDay/EndOfDayEntry";
import EndOfDaySummary from "./pages/endOfDay/EndOfDaySummary";
import Navbar from "./components/Navbar";
import InventoryManagementSystem from "./pages/RetailInventorySystem";

// --------------------
// Protected Route
// --------------------
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// --------------------
// Routes Component
// --------------------
function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: [
        "en", "hi", "mr", "gu", "ta", "te",
        "bn", "kn", "ml", "or", "pa", "as"
      ],
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 28,
      horizontal_position: "right",
      vertical_position: "bottom",
      native_language_names: true,
    };

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Translation UI */}
      <div className="gtranslate_wrapper" />

      {/* Navbar always visible */}
      <Navbar />

      {/* App Layout */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<RetailerAuth />} />
              <Route path="/login" element={<RetailerAuth />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setup" element={<ShopSetup />} />
              <Route path="/inventory-upload" element={<InventoryUpload />} />
              <Route path="/suggestions" element={<ProductDemandSuggestions />} />
              <Route path="/small" element={<SmallStoreSetup />} />
              <Route path="/large" element={<LargeStoreSetup />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/cal" element={<Calender />} />
              <Route path="/end-of-day" element={<EndOfDayEntry />} />
              <Route path="/end-of-day-summary" element={<EndOfDaySummary />} />
              <Route path="/forecast" element={<FestivalDemandCalendar />} />

              {/* Default protected route - goes to setup after login */}
              <Route path="/" element={<ShopSetup />} />
              <Route path="/invent" element={<InventoryManagementSystem/>}/>
              <Route path="*" element={<Navigate to="/setup" replace />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
