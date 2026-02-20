import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import ProductCategories from "@/components/sections/ProductCategories";
import ProductsBrowser from "@/components/sections/ProductsBrowser";
import Applications from "@/components/sections/Applications";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Navigation />
      <Hero />
      <ProductCategories />
      <ProductsBrowser />
      <Applications />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
