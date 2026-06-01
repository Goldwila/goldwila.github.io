import { useState, useEffect, useCallback, memo } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import GoogleAuthDialog from "@/components/GoogleAuthDialog";
import { ChevronDown, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);
  const { isAuthenticated, subscription } = useAuth();
  const navigate = useNavigate();

  // Memoize navigate callback to prevent unnecessary re-renders
  const handleViewHouse = useCallback(() => {
    navigate("/village");
  }, [navigate]);

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const data = await api.get<{ subscriberCount: number }>("/houses/subscriber-count");
        setSubscriberCount(data.subscriberCount);
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
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 text-foreground">
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

            <div className="flex items-center justify-center lg:justify-start gap-2 mb-8 h-8">
              {subscriberCount !== null ? (
                <div className="flex items-center gap-2 text-gold animate-pulse">
                  <Users className="w-5 h-5" />
                  <span className="text-lg font-medium">{subscriberCount.toLocaleString()} Subscribers Joined</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 rounded-full bg-white/10" />
                  <Skeleton className="h-6 w-48 bg-white/10" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 justify-center lg:justify-start mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {isAuthenticated && subscription?.hasHouse ? (
                  <Button
                    size="lg"
                    className="px-10 text-base w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleViewHouse}
                  >
                    View My House
                  </Button>
                ) : isAuthenticated && subscription?.isSubscribed ? (
                  <GoogleAuthDialog>
                    <Button
                      size="lg"
                      className="px-10 text-base w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Claim Your House
                    </Button>
                  </GoogleAuthDialog>
                ) : (
                  <GoogleAuthDialog>
                    <Button
                      size="lg"
                      className="px-10 text-base w-full sm:w-auto relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
                      Join & Claim Your House
                    </Button>
                  </GoogleAuthDialog>
                )}
              </div>
              <a href="https://www.youtube.com/@Goldwila" target="_blank" rel="noopener noreferrer" className="text-center lg:text-left text-sm text-foreground/70 hover:text-foreground hover:underline underline-offset-4 transition-colors w-fit mx-auto lg:mx-0">
                Or visit our YouTube Channel
              </a>
            </div>
          </div>

          {/* Right Column: Village Image */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50 animate-pulse pointer-events-none"></div>

            <div className="relative rounded-lg overflow-hidden border border-white/20 shadow-2xl animate-float">
              <img
                src="/home.webp"
                alt="Goldwila Village"
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default memo(HeroSection);
