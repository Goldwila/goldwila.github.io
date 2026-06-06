import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const OAuth2Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const processedRef = useRef(false);

  useEffect(() => {
    const error = searchParams.get("error");
    const token = searchParams.get("token");
    if (processedRef.current) return;
    
    if (error) {
      processedRef.current = true;
      setStatus("error");
      setMessage(error);
      return;
    }

    processedRef.current = true;
    
    if (token) {
        localStorage.setItem("authToken", token);
    }

    // Update auth context by checking with the backend (cookie should be set)
    checkAuth().then(() => {
      setStatus("success");
      setMessage("Successfully authenticated! Redirecting...");

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }).catch(() => {
      setStatus("error");
      setMessage("Authentication failed.");
    });
  }, [searchParams, navigate, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === "loading" && (
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="w-16 h-16 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl font-serif">
            {status === "loading" && "Authenticating..."}
            {status === "success" && "Success!"}
            {status === "error" && "Authentication Failed"}
          </CardTitle>
          <CardDescription className="text-base">
            {status === "loading" && "Please wait while we complete your authentication"}
            {status === "success" && message}
            {status === "error" && message}
          </CardDescription>
        </CardHeader>
        
        {status === "error" && (
          <CardContent>
            <Button
              onClick={() => navigate("/")}
              className="w-full"
            >
              Return Home
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default OAuth2Redirect;
