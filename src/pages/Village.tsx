import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Home, Plus, Loader2, ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

interface House {
  id: number;
  houseNumber: string;
  houseName: string;
  status: string;
  createdAt: string;
}

const Village = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [filteredHouses, setFilteredHouses] = useState<House[]>([]);
  const [userHouses, setUserHouses] = useState<House[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [houseName, setHouseName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 6;

  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch houses from API
  useEffect(() => {
    fetchHouses();
    if (isAuthenticated) {
      fetchUserHouses();
    }
  }, [isAuthenticated]);

  // Filter houses based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = houses.filter(
        (house) =>
          house.houseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          house.houseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHouses(filtered);
      setCurrentPage(1);
    } else {
      setFilteredHouses(houses);
    }
  }, [searchQuery, houses]);

  const fetchHouses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/houses`);
      if (response.ok) {
        const data = await response.json();
        setHouses(data);
        setFilteredHouses(data);
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserHouses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/houses/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserHouses(data);
      }
    } catch (error) {
      console.error("Error fetching user houses:", error);
    }
  };

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
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${API_BASE_URL}/houses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ownerName: houseName.trim(),
        }),
      });

      if (response.ok) {
        toast({
          title: "House created!",
          description: "Your house has been added to the village",
        });
        setHouseName("");
        setIsDialogOpen(false);
        fetchHouses(); // Refresh the list
        fetchUserHouses(); // Refresh user houses
      } else {
        const error = await response.json();
        toast({
          title: "Failed to create house",
          description: error.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create house. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Pagination logic
  const indexOfLastHouse = currentPage * housesPerPage;
  const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);
  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="grain-overlay" />
      
      <div className="textured-bg min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-32 pb-16">
          {/* Header with House Logo */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-6 rounded-full">
                <Home className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              village
            </h1>
            <p className="text-foreground/70 text-lg">
              Browse and search through our village houses
            </p>
          </div>

          {/* Search Bar and Create Button */}
          <div className="max-w-2xl mx-auto mb-12 flex gap-4">
            <Input
              type="search"
              placeholder="Search by house number or owner name..."
              className="h-14 text-lg border-white/20 bg-white/5 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isAuthenticated && userHouses.length === 0 && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-14 px-6 gap-2 whitespace-nowrap">
                    <Plus className="w-5 h-5" />
                    Add House
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Your House</DialogTitle>
                    <DialogDescription>
                      Add your house to the village directory
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="houseName">House Name / Owner Name</Label>
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
            )}
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : currentHouses.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No houses found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try a different search term"
                  : isAuthenticated
                  ? "Be the first to add a house to the village!"
                  : "No houses have been added yet"}
              </p>
              {isAuthenticated && !searchQuery && userHouses.length === 0 && (
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First House
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* House Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentHouses.map((house) => (
                  <Card
                    key={house.id}
                    className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <Home className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                          {house.houseName}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-foreground/70">
                            <span className="font-semibold">House No:</span> {house.houseNumber}
                          </p>
                          <p className="text-foreground/70">
                            <span className="font-semibold">Status:</span>{" "}
                            <span className="text-green-500">{house.status}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="bg-white/5 backdrop-blur-sm border-white/10"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-foreground/70">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-white/5 backdrop-blur-sm border-white/10"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Village;
