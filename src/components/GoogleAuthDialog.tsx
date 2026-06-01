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
import { CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface GoogleAuthDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GoogleAuthDialog = ({ children, open, onOpenChange }: GoogleAuthDialogProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalIsOpen;
  const setIsOpen = isControlled ? onOpenChange! : setInternalIsOpen;
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);
  const { user, subscription, login, subscribe, unsubscribe } = useAuth();
  const { toast } = useToast();

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
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-center">
              Join Goldwila Village
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 py-6 items-center">
            <Button
              size="lg"
              onClick={login}
              className="w-full max-w-sm gap-3 bg-[#4285F4] text-white hover:bg-[#4285F4]/90 shadow-sm border-none pl-1"
            >
              <div className="bg-white rounded-full p-1 flex items-center justify-center">
                <GoogleIcon />
              </div>
              <span className="font-medium">Sign in with Google</span>
            </Button>

            <p className="text-xs text-center text-muted-foreground max-w-xs">
              We'll verify your YouTube subscription to add you to the building queue.
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

            <Button
              variant="ghost"
              size="sm"
              onClick={handleUnsubscribe}
              disabled={isUnsubscribing}
              className="text-muted-foreground hover:text-destructive"
            >
              {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe (Leave Queue)"}
            </Button>
          </div>
        </>
      );
    }

    // Logged in but not subscribed
    return (
      <>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-serif text-center">
            Complete Your Registration
          </DialogTitle>
          <DialogDescription className="text-base pt-2 text-center">
            Welcome back, {user.name}! One last step to join the village.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 py-6 items-center">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Click below to verify your YouTube subscription and join the building queue.
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full max-w-sm gap-2"
          >
            {isSubscribing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Subscription & Join"
            )}
          </Button>
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
