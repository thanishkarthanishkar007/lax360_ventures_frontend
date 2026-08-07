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

// Every nav item is its own route now (not an in-page anchor), so on each
// navigation we align the new page under the fixed navbar with a smooth
// scroll-to-top instead of carrying over the previous page's scroll offset.
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
    // Gate: land on the Book Demo form first; user proceeds to Home from there.
    if (location.pathname !== "/book-demo") {
      navigate("/book-demo", { replace: true });
    }
  };

  if (!introDone) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/book-demo" element={<BookDemoPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
