import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { api } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface SubscriptionStatus {
  isSubscribed: boolean;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  position?: number;
  youtubeChannelId?: string;
  hasHouse?: boolean;
}

interface AuthContextType {
  user: User | null;
  subscription: SubscriptionStatus | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  checkSubscription: () => Promise<void>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const data = await api.get<User>("/auth/me");
      setUser(data);
    } catch (e) {
      setUser(null);
      setSubscription(null);
      localStorage.removeItem("subscription");
      localStorage.removeItem("authToken");
    }
    setIsLoading(false);
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check subscription status when user changes
  useEffect(() => {
    if (user) {
      checkSubscription();
    } else {
      setSubscription(null);
    }
  }, [user]);

  const checkSubscription = async () => {
    try {
      const data = await api.get<{ isSubscribed: boolean; status?: "PENDING" | "IN_PROGRESS" | "COMPLETED"; queuePosition?: number; youtubeChannelId?: string }>("/subscribers/me");

      // Check if user has a house
      let hasHouse = false;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const houses = await api.get<any[]>("/houses/my");
        hasHouse = houses.length > 0;
      } catch (e) {
        // Ignore errors checking house status
      }

      const newSub: SubscriptionStatus = {
        isSubscribed: data.isSubscribed,
        status: data.status,
        position: data.queuePosition,
        youtubeChannelId: data.youtubeChannelId,
        hasHouse: hasHouse
      };
      setSubscription(newSub);
      localStorage.setItem("subscription", JSON.stringify(newSub));
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      if (errMessage.includes("401") || errMessage.includes("Unauthorized")) {
        // User is not authenticated, treat as not subscribed
        const newSub = { isSubscribed: false };
        setSubscription(newSub);
        localStorage.setItem("subscription", JSON.stringify(newSub));
        return;
      }

      // Don't clear subscription on error to avoid flashing, just log it
      const newSub = { isSubscribed: false };
      setSubscription(newSub);
      localStorage.setItem("subscription", JSON.stringify(newSub));
    }
  };

  const subscribe = async () => {
    try {
      if (!user) {
        login();
        return;
      }

      await api.post("/subscribers/subscribe", {});

      // Optimistic update
      const newSub: SubscriptionStatus = {
        ...(subscription || {}),
        isSubscribed: true,
        status: "PENDING" // Assuming pending initially
      };
      setSubscription(newSub);
      localStorage.setItem("subscription", JSON.stringify(newSub));

      // Then fetch fresh data
      await checkSubscription();
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      // If unauthorized, redirect to login
      if (errMessage.includes("401") || errMessage.includes("Unauthorized")) {
        login();
        return;
      }
      throw error;
    }
  };

  const unsubscribe = async () => {

    try {
      if (!user) {
        throw new Error("Not authenticated");
      }

      await api.post("/subscribers/unsubscribe", {});

      // Optimistic update
      const newSub: SubscriptionStatus = {
        ...(subscription || {}),
        isSubscribed: false,
        status: undefined,
        position: undefined,
        hasHouse: false // Assuming losing house if unsubscribed? Or just queue spot?
      };
      setSubscription(newSub);
      localStorage.setItem("subscription", JSON.stringify(newSub));

      // Then fetch fresh data
      await checkSubscription();
    } catch (error: unknown) {
      throw error;
    }
  };

  const login = () => {
    window.location.href = `${api.url}/oauth2/authorization/google`;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (e) {
      // ignore
    }
    setUser(null);
    setSubscription(null);
    localStorage.removeItem("subscription");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkSubscription,
        subscribe,
        unsubscribe,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
