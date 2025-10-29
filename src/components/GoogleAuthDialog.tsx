import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Chrome, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface GoogleAuthDialogProps {
  children: React.ReactNode;
}

const GoogleAuthDialog = ({ children }: GoogleAuthDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { user, subscription, login, subscribe } = useAuth();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsSubscribing(true);
      await subscribe();
      toast({
        title: "Successfully subscribed!",
        description: "You've been added to the queue. Your house will be built soon!",
      });
      setIsOpen(false);
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

  const renderContent = () => {
    // Not logged in
    if (!user) {
      return (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              Claim Your House
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Sign in with Google to link your YouTube subscription and claim your house in our village.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-semibold mb-2">How it works:</h4>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li>1. Sign in with your Google account</li>
                <li>2. We'll verify your YouTube subscription</li>
                <li>3. You'll be added to the queue</li>
                <li>4. Your house will be built in the next episode!</li>
              </ol>
            </div>

            <Button
              size="lg"
              onClick={login}
              className="w-full gap-2"
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to share your YouTube subscription status with Goldwila
            </p>
          </div>
        </>
      );
    }

    // Already subscribed
    if (subscription?.isSubscribed) {
      const statusInfo = {
        PENDING: { icon: Clock, text: "In Queue", color: "text-yellow-500" },
        IN_PROGRESS: { icon: Loader2, text: "Building...", color: "text-blue-500" },
        COMPLETED: { icon: CheckCircle2, text: "Completed!", color: "text-green-500" },
      };

      const info = statusInfo[subscription.status || "PENDING"];
      const Icon = info.icon;

      return (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">
              Your Subscription Status
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Track your house building progress
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 py-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <Icon className={`w-12 h-12 mx-auto mb-3 ${info.color} ${subscription.status === "IN_PROGRESS" ? "animate-spin" : ""}`} />
              <h3 className="text-xl font-semibold mb-2">{info.text}</h3>
              <p className="text-muted-foreground mb-4">
                {subscription.status === "COMPLETED" 
                  ? "Your house has been built! Check it out in the latest episode."
                  : subscription.status === "IN_PROGRESS"
                  ? "We're currently building your house. Stay tuned for the next episode!"
                  : `You're in the queue! ${subscription.position ? `Position: ${subscription.position}` : ""}`
                }
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </>
      );
    }

    // Logged in but not subscribed
    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Subscribe to Claim Your House
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Welcome back, {user.name}! Subscribe to get your house built.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">What happens next:</h4>
            <ol className="text-sm space-y-2 text-muted-foreground">
              <li>1. Click subscribe to join the queue</li>
              <li>2. We'll verify your YouTube subscription</li>
              <li>3. Your house will be built in an upcoming episode</li>
              <li>4. You'll be notified when it's ready!</li>
            </ol>
          </div>

          <Button
            size="lg"
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full gap-2"
          >
            {isSubscribing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Subscribing...
              </>
            ) : (
              "Subscribe & Claim Your House"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Make sure you're subscribed to our YouTube channel first!
          </p>
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default GoogleAuthDialog;
