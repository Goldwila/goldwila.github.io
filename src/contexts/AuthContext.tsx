import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface SubscriptionStatus {
  isSubscribed: boolean;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  position?: number;
  youtubeChannelId?: string;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userEmail");

      if (token && userId && userName && userEmail) {
        setUser({
          id: userId,
          name: userName,
          email: userEmail,
        });
      }
      setIsLoading(false);
    };

    loadUser();
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
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/subscribers/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription({
          isSubscribed: true,
          status: data.status,
          position: data.queuePosition,
          youtubeChannelId: data.youtubeChannelId,
        });
      } else if (response.status === 404) {
        setSubscription({
          isSubscribed: false,
        });
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
      setSubscription({
        isSubscribed: false,
      });
    }
  };

  const subscribe = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(`${API_BASE_URL}/subscribers/subscribe`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await checkSubscription();
        return;
      }

      const error = await response.json();
      throw new Error(error.message || "Failed to subscribe");
    } catch (error) {
      console.error("Error subscribing:", error);
      throw error;
    }
  };

  const login = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setUser(null);
    setSubscription(null);
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
