import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import Products from "../components/Products";
import productsBg from "../assets/images/products-bg.jpg";

export default function ProductsPage() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Our products"
          title="Interactive Web Experiences, Built to Convert."
          description="High-performance 3D animated web solutions tailored for luxury dining, haute joaillerie, athletic clubs, and couture fashion."
          bgImage={productsBg}
        />
        <Products />
      </main>
      <Footer />
    </div>
  );
}
