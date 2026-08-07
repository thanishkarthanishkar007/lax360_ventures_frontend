import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Testimonials from "../components/Testimonials";
import TrustedBy from "../components/TrustedBy";

export default function CustomersPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Customers"
          title="The organizations we work with."
          description="From clinics and hospitals to colleges and schools — here are a few of the organizations running their operations on LAX360 Ventures."
        />
        <TrustedBy />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
