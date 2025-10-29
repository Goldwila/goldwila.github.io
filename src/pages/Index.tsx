import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VillageGallery from "@/components/VillageGallery";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Film Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Main Content with Textured Background */}
      <div className="textured-bg min-h-screen">
        <Navbar />
        <HeroSection />
        <VillageGallery />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
