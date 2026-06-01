import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, CheckCircle, Menu } from "lucide-react";
import GoogleAuthDialog from "@/components/GoogleAuthDialog";
import { useState } from "react";

const Navbar = () => {
  const { user, subscription, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary font-medium" : "text-foreground/70 hover:text-foreground";
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link 
        to="/" 
        className={`${isActive("/")} transition-colors ${mobile ? "text-lg py-2" : ""}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Home
      </Link>
      <Link 
        to="/village" 
        className={`${isActive("/village")} transition-colors ${mobile ? "text-lg py-2" : ""}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Village
      </Link>
      <Link 
        to="/membership" 
        className={`${isActive("/membership")} transition-colors ${mobile ? "text-lg py-2" : ""}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        Membership
      </Link>
      <Link 
        to="/about" 
        className={`${isActive("/about")} transition-colors ${mobile ? "text-lg py-2" : ""}`}
        onClick={() => mobile && setIsOpen(false)}
      >
        About
      </Link>
    </>
  );

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 backdrop-blur-sm bg-background/80"
      style={{ paddingRight: 'var(--removed-body-scroll-bar-size)' }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.jpg"
              alt="Goldwila Logo" 
              className="h-10 w-10 md:h-12 md:w-12 rounded-md object-cover"
            />
            <h2 className="font-serif text-xl md:text-3xl font-bold text-foreground">
              Goldwila
            </h2>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            {!user && (
              <div className="hidden md:block">
                <GoogleAuthDialog>
                  <Button variant="default" className="border-white/20 hover:border-white/30">
                    Sign In
                  </Button>
                </GoogleAuthDialog>
              </div>
            )}
            
            {user ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl p-2 shadow-2xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer rounded-xl transition-colors hover:bg-primary/20 hover:text-primary">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  
                  {subscription?.isSubscribed && (
                    <>
                      <DropdownMenuItem className="flex items-center gap-2 cursor-default rounded-xl hover:bg-primary/20 transition-colors">
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
                  
                  <DropdownMenuItem onSelect={() => setIsLogoutDialogOpen(true)} className="cursor-pointer rounded-xl hover:bg-primary/20 hover:text-primary transition-colors">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Mobile Subscribe Button (only if not logged in)
              <div className="md:hidden">
                <GoogleAuthDialog>
                  <Button size="sm" variant="default">
                    Sign In
                  </Button>
                </GoogleAuthDialog>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl font-bold text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks mobile />
                  {!user && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Button
                        className="w-full"
                        onClick={() => {
                          setIsOpen(false);
                          setTimeout(() => setIsAuthDialogOpen(true), 150);
                        }}
                      >
                        Sign In to Join
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <GoogleAuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <button className="hidden" />
      </GoogleAuthDialog>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-center">Confirm Sign Out</DialogTitle>
            <DialogDescription className="text-center pt-2 text-base">
              Are you sure you want to sign out? You will need to sign back in to manage your village house.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" className="w-full sm:w-auto" onClick={() => {
              setIsLogoutDialogOpen(false);
              logout();
            }}>
              Sign Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default Navbar;
