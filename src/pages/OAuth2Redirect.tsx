import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const OAuth2Redirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }

    if (token && userId && email && name) {
      // Store authentication data
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", decodeURIComponent(email));
      localStorage.setItem("userName", decodeURIComponent(name));

      setStatus("success");
      setMessage("Successfully authenticated! Redirecting...");

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setStatus("error");
      setMessage("Authentication failed. Missing required parameters.");
    }
  }, [searchParams, navigate]);

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
