import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Products from "../components/Products";
import Statistics from "../components/Statistics";

export default function ProductsPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our products"
          title="One platform, Multiple ways to grow."
          description="CRM, ERP, Hospital Management, and Clinic Management — use one standalone, or combine all four on a shared data layer and login."
        />
        <Products />
        <Statistics />
      </main>
      <Footer />
    </div>
  );
}
