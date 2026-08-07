import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import AboutUs from "../components/AboutUs";
import Products from "../components/Products";
import WhyLax360 from "../components/WhyLax360";
import Industries from "../components/Industries";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="bg-void">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <AboutUs />
        <Products />
        <WhyLax360 />
        <Industries />
        <Statistics />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
