import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User as UserIcon, 
  CheckCircle, 
  Clock, 
  Loader2, 
  Home, 
  Youtube, 
  LogOut,
  MapPin,
  Trophy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

interface House {
  id: number;
  houseName: string;
  houseNumber: string;
  status: string;
}

const Profile = () => {
  const { user, subscription, isAuthenticated, isLoading, unsubscribe, subscribe, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [myHouse, setMyHouse] = useState<House | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchMyHouse = async () => {
      if (isAuthenticated && subscription?.hasHouse) {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
          const token = localStorage.getItem("authToken");
          const response = await fetch(`${API_BASE_URL}/houses/my`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const houses = await response.json();
            if (houses.length > 0) {
              setMyHouse(houses[0]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch house details", error);
        }
      }
    };
    fetchMyHouse();
  }, [isAuthenticated, subscription]);

  const handleSubscribe = async () => {
    try {
      setIsSubscribing(true);
      await subscribe();
      toast({
        title: "Successfully subscribed!",
        description: "You've been added to the queue.",
      });
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      setIsUnsubscribing(true);
      await unsubscribe();
      toast({
        title: "Unsubscribed",
        description: "You have been removed from the queue.",
      });
    } catch (error) {
      toast({
        title: "Unsubscription failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUnsubscribing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "IN_PROGRESS": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO 
        title="My Profile - Goldwila" 
        description="Manage your Goldwila subscription and view your house status."
      />
      <div className="grain-overlay opacity-50" />
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16 relative z-10">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <UserIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Welcome, {user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2 border-white/10 hover:bg-white/5">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Status & House */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${subscription?.isSubscribed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      <Youtube className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Subscription</p>
                    <p className="font-semibold">{subscription?.isSubscribed ? "Active" : "Inactive"}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Queue Position</p>
                    <p className="font-semibold">{subscription?.position ? `#${subscription.position}` : "-"}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mb-3">
                      <Home className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">House Status</p>
                    <p className="font-semibold">{myHouse ? "Claimed" : "Not Claimed"}</p>
                  </CardContent>
                </Card>
              </div>

              {/* House Details Card */}
              {myHouse ? (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
                    <div className="absolute bottom-0 left-0 p-6">
                      <Badge className={getStatusColor(myHouse.status)}>
                        {myHouse.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{myHouse.houseName}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {myHouse.houseNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-black/20 border border-white/5">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          Village Benefits
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                          <li>Your name featured in the village</li>
                          <li>A permanent spot in our world</li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => navigate("/village")}>
                        View in Village Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm border-dashed">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                      <Home className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No House Claimed Yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      {subscription?.isSubscribed 
                        ? "You are subscribed! You can now claim your house spot in the village."
                        : "Subscribe to our YouTube channel to unlock your own house in the Goldwila village."}
                    </p>
                    {subscription?.isSubscribed ? (
                      <Button size="lg" className="px-8">
                        Claim House Now
                      </Button>
                    ) : (
                      <Button size="lg" onClick={handleSubscribe} disabled={isSubscribing}>
                        {isSubscribing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          "Subscribe to Claim"
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Actions & Info */}
            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5" onClick={() => navigate("/village")}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Explore Village
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5" onClick={() => navigate("/membership")}>
                    <Trophy className="w-4 h-4 mr-2" />
                    View Memberships
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/10 hover:bg-white/5" onClick={() => window.open("https://www.youtube.com/@Goldwila", "_blank")}>
                    <Youtube className="w-4 h-4 mr-2" />
                    View YouTube Channel
                  </Button>
                </CardContent>
              </Card>

              {subscription?.isSubscribed ? (
                <Card className="bg-red-500/5 border-red-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-red-400 text-lg">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Unsubscribing will remove you from the queue and you may lose your house spot.
                    </p>
                    <Button 
                      variant="ghost" 
                      className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={handleUnsubscribe}
                      disabled={isUnsubscribing}
                    >
                      {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">Subscribe Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Subscribe to our YouTube channel to join the queue and get your house built!
                    </p>
                    <Button 
                      className="w-full gap-2"
                      onClick={handleSubscribe}
                      disabled={isSubscribing}
                    >
                      {isSubscribing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Youtube className="w-4 h-4" />
                          Subscribe to Goldwila
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
