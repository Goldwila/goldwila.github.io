import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User as UserIcon,
  CheckCircle,
  Clock,
  Loader2,
  Home,
  LogOut,
  MapPin,
  Trophy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
  
  const [isCreating, setIsCreating] = useState(false);
  const [houseName, setHouseName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateHouse = async () => {
    if (!houseName.trim()) {
      toast({
        title: "House name required",
        description: "Please enter a name for your house",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      const res = await api.post<House>("/houses", {
        ownerName: houseName.trim(),
      });

      toast({
        title: "House created!",
        description: "Your house has been added to the village",
      });
      setHouseName("");
      setIsDialogOpen(false);
      setMyHouse(res);
      // Update cache
      localStorage.setItem("myHouseData", JSON.stringify(res));
      localStorage.setItem("myHouseTimestamp", Date.now().toString());
      
      // Update user subscription state if it comes from the API, 
      // or just checkAuth to ensure global state matches
      // await checkAuth(); 
    } catch (error: Error | unknown) {
      toast({
        title: "Error claiming house",
        description: error instanceof Error ? error.message : "Failed to claim house",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const fetchMyHouse = async () => {
      if (isAuthenticated && subscription?.hasHouse) {
        // Check cache first
        const cachedHouse = localStorage.getItem("myHouseData");
        const cachedTimestamp = localStorage.getItem("myHouseTimestamp");
        const now = Date.now();
        const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

        if (cachedHouse && cachedTimestamp && (now - parseInt(cachedTimestamp) < CACHE_DURATION)) {
          try {
            setMyHouse(JSON.parse(cachedHouse));
            return; // Use cached data
          } catch (e) {
            console.error("Failed to parse cached house data", e);
          }
        }

        try {
          const token = localStorage.getItem("authToken");
          const houses = await api.get<House[]>("/houses/my", {
            Authorization: `Bearer ${token}`,
          });

          if (houses.length > 0) {
            const houseData = houses[0];
            setMyHouse(houseData);
            // Update cache
            localStorage.setItem("myHouseData", JSON.stringify(houseData));
            localStorage.setItem("myHouseTimestamp", now.toString());
          } else {
            setMyHouse(null);
            localStorage.removeItem("myHouseData");
            localStorage.removeItem("myHouseTimestamp");
          }
        } catch (error) {
          console.error("Failed to fetch house details", error);
        }
      } else {
        setMyHouse(null);
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

  // Show loading state while checking subscription if not yet available
  if (subscription === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader className="text-center">
                  <AlertDialogTitle className="text-2xl font-serif text-center">Confirm Sign Out</AlertDialogTitle>
                  <AlertDialogDescription className="text-center pt-2 text-base">
                    Are you sure you want to sign out? You will need to sign back in to manage your village house.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                  <AlertDialogCancel className="w-full sm:w-auto mt-0">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 m-0">
                    Sign Out
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Status & House */}
            <div className="lg:col-span-2 space-y-8">

              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${subscription?.isSubscribed ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}>
                      <YoutubeIcon className="w-5 h-5" />
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
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
                        <DialogTrigger asChild>
                          <Button size="lg" className="px-8">
                            Claim House Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader className="text-center">
                            <DialogTitle className="text-2xl font-serif text-center">Create Your House</DialogTitle>
                            <DialogDescription className="text-center">
                              Enter a name for your house in the village. This will be publicly visible.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 pt-4">
                            <div className="space-y-2">
                              <Label htmlFor="houseName" className="text-center block">House Name / Owner Name</Label>
                              <Input
                                id="houseName"
                                placeholder="Enter house or owner name"
                                value={houseName}
                                onChange={(e) => setHouseName(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleCreateHouse()}
                              />
                            </div>
                            <Button
                              onClick={handleCreateHouse}
                              disabled={isCreating}
                              className="w-full"
                            >
                              {isCreating ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Creating...
                                </>
                              ) : (
                                "Create House"
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                    <YoutubeIcon className="w-4 h-4 mr-2" />
                    View YouTube Channel
                  </Button>
                </CardContent>
              </Card>

              <Card className={`${subscription?.isSubscribed ? "bg-green-500/5 border-green-500/20" : "bg-primary/5 border-primary/20"} backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`${subscription?.isSubscribed ? "text-green-400" : "text-primary"} text-lg`}>
                    YouTube Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {subscription?.isSubscribed
                      ? "You are subscribed and in the queue! Unsubscribing will remove you and you may lose your spot."
                      : "Subscribe to our YouTube channel to join the queue and get your house built!"}
                  </p>

                  {subscription?.isSubscribed ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="w-full gap-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                          variant="outline"
                          disabled={isUnsubscribing}
                        >
                          {isUnsubscribing ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Unsubscribing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Subscribed
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Unsubscribing will remove you from the queue and you may lose your house spot. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleUnsubscribe} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Unsubscribe
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
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
                          <YoutubeIcon className="w-4 h-4" />
                          Subscribe to Goldwila
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
