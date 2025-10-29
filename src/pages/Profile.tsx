import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, User as UserIcon, Calendar, CheckCircle, Clock, Loader2 } from "lucide-react";

const Profile = () => {
  const { user, subscription, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusBadge = () => {
    if (!subscription?.isSubscribed) {
      return <Badge variant="secondary">Not Subscribed</Badge>;
    }

    const statusConfig = {
      PENDING: { variant: "secondary" as const, icon: Clock, text: "In Queue" },
      IN_PROGRESS: { variant: "default" as const, icon: Loader2, text: "Building" },
      COMPLETED: { variant: "default" as const, icon: CheckCircle, text: "Completed" },
    };

    const config = statusConfig[subscription.status || "PENDING"];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${subscription.status === "IN_PROGRESS" ? "animate-spin" : ""}`} />
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navbar />

      <div className="flex justify-end items-center px-6 pt-6">
        <div className="flex items-center gap-2">
          <span className="font-semibold">YouTube Subscription:</span>
          {isLoading ? (
            <Badge variant="secondary">Checking...</Badge>
          ) : subscription?.isSubscribed ? (
            <Badge variant="default">Subscribed</Badge>
          ) : (
            <Badge variant="secondary">Not Subscribed</Badge>
          )}
        </div>
      </div>
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and subscription</p>
          </div>

          <div className="grid gap-6">
            {/* User Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Subscription Status</span>
                  {getStatusBadge()}
                </CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscription?.isSubscribed ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium">{subscription.status}</p>
                      </div>
                      {subscription.position && (
                        <div>
                          <p className="text-sm text-muted-foreground">Queue Position</p>
                          <p className="font-medium">#{subscription.position}</p>
                        </div>
                      )}
                      {subscription.youtubeChannelId && (
                        <div className="col-span-2">
                          <p className="text-sm text-muted-foreground">YouTube Channel</p>
                          <p className="font-medium break-all">{subscription.youtubeChannelId}</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      {subscription.status === "COMPLETED" ? (
                        <p className="text-sm">
                          🎉 Your house has been built! Check it out in the latest episode and explore the village.
                        </p>
                      ) : subscription.status === "IN_PROGRESS" ? (
                        <p className="text-sm">
                          🏗️ Your house is currently being built! Stay tuned for the next episode.
                        </p>
                      ) : (
                        <p className="text-sm">
                          ⏳ You're in the queue! We'll notify you when your house is ready to be built.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      You haven't subscribed yet. Subscribe to claim your house in our village!
                    </p>
                    <Button onClick={() => navigate("/")}>
                      Go to Home & Subscribe
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Navigate to different sections</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="outline" onClick={() => navigate("/village")} className="justify-start">
                  Explore Village
                </Button>
                <Button variant="outline" onClick={() => navigate("/membership")} className="justify-start">
                  View Memberships
                </Button>
                <Button variant="outline" onClick={() => navigate("/about")} className="justify-start">
                  About Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
