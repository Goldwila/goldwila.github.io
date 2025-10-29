import { Button } from "@/components/ui/button";
import GoogleAuthDialog from "@/components/GoogleAuthDialog";

const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6">
              Goldwila
            </h1>
            
            <p className="text-2xl md:text-3xl font-serif text-primary mb-8">
              Subscribe to Be Part.
            </p>
            
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
              Every subscriber gets their own house built in our Minecraft survival world.
              <br />
              <span className="text-foreground/60">No kidding - hit subscribe, get a house. It's that simple.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <GoogleAuthDialog>
                <Button 
                  size="lg"
                  className="px-10 text-base w-full sm:w-auto"
                >
                  Subscribe & Claim Your House
                </Button>
              </GoogleAuthDialog>
              <a href="https://discord.gg/JeYge48R3G" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-foreground hover:bg-white/10 hover:text-foreground px-10 text-base w-full sm:w-auto"
                >
                  Join Our Discord
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right Column: Village Image */}
          <div className="rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="/home.png" 
              alt="Goldwila Village"
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
