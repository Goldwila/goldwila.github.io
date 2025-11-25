import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, MapPin } from "lucide-react";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center">
      <SEO 
        title="Page Not Found - Goldwila" 
        description="You've wandered too far into the void."
      />
      
      {/* Background Effects */}
      <div className="grain-overlay" />
      <div className="textured-bg absolute inset-0 -z-10" />

      <div className="container px-6 text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
            <MapPin className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
        
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-6">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
          You've wandered too far...
        </h2>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist in our village map. It might have been moved or never built.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2 min-w-[160px]">
              <Home className="w-4 h-4" />
              Return Home
            </Button>
          </Link>
          <Link to="/village">
            <Button size="lg" variant="outline" className="gap-2 min-w-[160px] border-white/10 hover:bg-white/5">
              <MapPin className="w-4 h-4" />
              View Map
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
