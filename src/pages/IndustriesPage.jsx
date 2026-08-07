import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Industries from "../components/Industries";
import WhyLax360 from "../components/WhyLax360";

export default function IndustriesPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Industries we serve"
          title="Built to flex across sectors."
          description="From fintech compliance to hospital scheduling, LAX360 Ventures adapts to how your industry actually operates."
        />
        <Industries />
        <WhyLax360 />
      </main>
      <Footer />
    </div>
  );
}
