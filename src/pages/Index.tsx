import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VillageGallery from "@/components/VillageGallery";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FadeIn from "@/components/FadeIn";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SEO 
        title="Goldwila - The Village That Grows With You" 
        description="Join the Goldwila community. Every subscriber gets their own house built in our Minecraft world. Watch the village grow with every new member."
      />
      {/* Film Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Main Content with Textured Background */}
      <div className="textured-bg min-h-screen">
        <Navbar />
        <HeroSection />
        
        <FadeIn delay={0.2}>
          <VillageGallery />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <FAQSection />
        </FadeIn>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
