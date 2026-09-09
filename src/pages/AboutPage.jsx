import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import AboutUs from "../components/AboutUs";
import aboutBg from "../assets/images/about-bg.jpg";

export default function AboutPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About us"
          title="We build the tools growing companies run on."
          description="LAX360 Ventures is a SaaS product company based in India, on a mission to give growing businesses the same operational leverage that only large enterprises used to afford."
          bgImage={aboutBg}
        />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
