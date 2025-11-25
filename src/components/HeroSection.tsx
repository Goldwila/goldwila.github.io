import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GoogleAuthDialog from "@/components/GoogleAuthDialog";
import { ChevronDown, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const { isAuthenticated, subscription } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const response = await fetch(`${API_BASE_URL}/houses/subscriber-count`);
        if (response.ok) {
          const data = await response.json();
          setSubscriberCount(data.subscriberCount);
        }
      } catch (error) {
        console.error("Failed to fetch subscriber count", error);
      }
    };

    fetchSubscriberCount();
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 px-6 min-h-screen flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto w-full">
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

            {subscriberCount !== null && (
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-8 text-gold animate-pulse">
                <Users className="w-5 h-5" />
                <span className="text-lg font-medium">{subscriberCount.toLocaleString()} Subscribers Joined</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              {isAuthenticated && subscription?.hasHouse ? (
                <Button 
                  size="lg"
                  className="px-10 text-base w-full sm:w-auto"
                  onClick={() => navigate("/village")}
                >
                  View My House
                </Button>
              ) : isAuthenticated && subscription?.isSubscribed ? (
                <GoogleAuthDialog>
                  <Button 
                    size="lg"
                    className="px-10 text-base w-full sm:w-auto"
                  >
                    Claim Your House
                  </Button>
                </GoogleAuthDialog>
              ) : (
                <GoogleAuthDialog>
                  <Button 
                    size="lg"
                    className="px-10 text-base w-full sm:w-auto"
                  >
                    Subscribe & Claim Your House
                  </Button>
                </GoogleAuthDialog>
              )}
              <a href="https://www.youtube.com/@Goldwila" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-foreground hover:bg-white/10 hover:text-foreground px-10 text-base w-full sm:w-auto"
                >
                  View YouTube Channel
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right Column: Village Image */}
          <div className="rounded-lg overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src="/home.webp" 
              alt="Goldwila Village"
              fetchPriority="high"
              className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
