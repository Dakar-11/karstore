import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <ProductGrid />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
      <CartPanel />
    </>
  );
}
