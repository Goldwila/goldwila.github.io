import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  // ...existing code...

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="grain-overlay" />
      
      <div className="textured-bg min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-32 pb-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Goldwila
            </h1>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-white/5 backdrop-blur-sm border-white/10">
              <div className="space-y-6 text-foreground/80">
                <p className="text-lg leading-relaxed">la</p>

                <p className="text-lg leading-relaxed">
                  Goldwila is a Minecraft survival village where every subscriber gets their own house.
                </p>

                <p className="text-lg leading-relaxed">
                  The idea is simple: what if every person who subscribed didn't just become a number,
                  but a neighbor?
                </p>

                <p className="text-lg leading-relaxed">
                  Each house is built by hand in survival mode. No creative mode. Every structure
                  represents someone who decided to be part of this community.
                </p>

                <p className="text-lg leading-relaxed">
                  This isn't about fancy builds or massive projects. It's about creating something
                  together. Your house becomes part of the village's story.
                </p>

                <h2 className="font-semibold text-xl">How It Works</h2>

                <p className="text-lg leading-relaxed">
                  When you subscribe, your house gets built and added to the village.
                </p>

                <p className="text-lg leading-relaxed">
                  Claim your house, give it a name, and explore the village in 3D right here on the
                  website.
                </p>

                <p className="text-lg leading-relaxed">
                  Join our Discord to meet the people whose houses are right next to yours. You're not
                  just a viewer—you're part of it.
                </p>

                <p className="text-lg leading-relaxed">
                  Standard houses are free for all subscribers. Want something custom? Check out our
                  <a href="/membership" className="text-primary underline ml-1">membership options</a>.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
