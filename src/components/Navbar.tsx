import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, CheckCircle } from "lucide-react";
import GoogleAuthDialog from "@/components/GoogleAuthDialog";

const Navbar = () => {
  const { user, subscription, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.jpg"
              alt="Goldwila Logo" 
              className="h-12 w-12 rounded-md object-cover"
            />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Goldwila
            </h2>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/village" className="text-foreground/70 hover:text-foreground transition-colors">
              Village
            </Link>
            <Link to="/membership" className="text-foreground/70 hover:text-foreground transition-colors">
              Membership
            </Link>
            <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <GoogleAuthDialog>
                <Button variant="default" className="border-white/20 hover:border-white/30">
                  Subscribe
                </Button>
              </GoogleAuthDialog>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  
                  {subscription?.isSubscribed && (
                    <>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-default">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div className="flex flex-col">
                          <span className="font-medium">Subscribed</span>
                          <span className="text-xs text-muted-foreground">
                            Status: {subscription.status}
                          </span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
