import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import CinematicIntro from "./components/CinematicIntro";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import BookDemoPage from "./pages/BookDemoPage";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import IndustriesPage from "./pages/IndustriesPage";
import TeamsPage from "./pages/TeamsPage";
import CustomersPage from "./pages/CustomersPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { ThemeProvider } from "./context/ThemeContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleIntroComplete = () => {
    setIntroDone(true);
    if (location.pathname !== "/book-demo") {
      navigate("/book-demo", { replace: true });
    }
  };

  if (!introDone) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <ThemeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/book-demo" element={<BookDemoPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}
