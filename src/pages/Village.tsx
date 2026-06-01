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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Home, Plus, Loader2, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import SEO from "@/components/SEO";
import FadeIn from "@/components/FadeIn";

import { api } from "@/lib/api";

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
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("ALL");
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

  // Filter and sort houses
  useEffect(() => {
    let result = [...houses];

    // Status filter
    if (statusFilter !== "ALL") {
      result = result.filter(house => house.status === statusFilter);
    }

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (house) =>
          house.houseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          house.houseName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === "house-asc") {
      result.sort((a, b) => a.houseNumber.localeCompare(b.houseNumber));
    }

    setFilteredHouses(result);
    setCurrentPage(1);
  }, [searchQuery, houses, sortBy, statusFilter]);

  const fetchHouses = async () => {
    try {
      setIsLoading(true);
      const data = await api.get<House[]>("/houses");
      setHouses(data);
      setFilteredHouses(data);
    } catch (error) {
      console.error("Error fetching houses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserHouses = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await api.get<House[]>("/houses/my", {
        Authorization: `Bearer ${token}`,
      });
      setUserHouses(data);
    } catch (error: Error | unknown) {
      if (error instanceof Error && (error.message.includes("401") || error.message.includes("Unauthorized"))) {
        // User not logged in, just clear user houses
        setUserHouses([]);
        return;
      }
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

      await api.post("/houses", {
        ownerName: houseName.trim(),
      }, {
        Authorization: `Bearer ${token}`,
      });

      toast({
        title: "House created!",
        description: "Your house has been added to the village",
      });
      setHouseName("");
      setIsDialogOpen(false);
      fetchHouses(); // Refresh the list
      fetchUserHouses(); // Refresh user houses
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
      <SEO
        title="Village Directory - Goldwila"
        description="Explore the Goldwila village. Find houses, see who's joined, and claim your spot in our growing community."
      />
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

          {/* Controls: Search, Filter, Sort, Add */}
          <div className="max-w-5xl mx-auto mb-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
            {/* Subtle glow effect behind the search container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[80px] pointer-events-none rounded-full" />
            
            <div className="relative flex flex-col lg:flex-row gap-4 items-center z-10">
              {/* Search Bar */}
              <div className="relative w-full lg:flex-1 group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors duration-300" />
                </div>
                <Input
                  type="search"
                  placeholder="Search by house or owner name..."
                  className="w-full h-14 pl-14 pr-6 rounded-2xl bg-black/40 border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 text-base placeholder:text-white/40 transition-all duration-300 shadow-inner hover:bg-black/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="relative w-full sm:w-[180px] group flex items-center justify-between h-14 pl-11 pr-4 bg-black/40 border border-white/10 rounded-2xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 cursor-pointer shadow-inner hover:bg-black/50">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Filter className="h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors duration-300" />
                      </div>
                      <span className="truncate">
                        {sortBy === "newest" ? "Newest First" : sortBy === "oldest" ? "Oldest First" : "House No. (A-Z)"}
                      </span>
                      <ChevronRight className="h-4 w-4 text-white/40 rotate-90 transition-transform duration-300 group-focus-within:text-primary" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px] rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl p-2 shadow-2xl">
                    <DropdownMenuItem className="cursor-pointer rounded-xl transition-colors hover:bg-white/5" onSelect={() => setSortBy("newest")}>
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-xl transition-colors hover:bg-white/5" onSelect={() => setSortBy("oldest")}>
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-xl transition-colors hover:bg-white/5" onSelect={() => setSortBy("house-asc")}>
                      House No. (A-Z)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {isAuthenticated && userHouses.length === 0 && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="h-14 px-8 rounded-2xl gap-2 whitespace-nowrap bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] text-primary-foreground transition-all duration-300 font-medium w-full sm:w-auto">
                        <Plus className="w-5 h-5" />
                        Claim House
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-serif text-center">Create Your House</DialogTitle>
                        <DialogDescription className="text-center">
                          Add your house to the village directory
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
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6 bg-white/5 backdrop-blur-sm border-white/10">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4 bg-white/10" />
                      <Skeleton className="h-4 w-1/2 bg-white/10" />
                      <Skeleton className="h-4 w-1/3 bg-white/10" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : currentHouses.length === 0 ? (
            <div className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-2xl mx-auto">
              <div className="bg-primary/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-3xl font-semibold mb-4">No houses found</h3>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto text-lg">
                {(searchQuery || statusFilter !== "ALL")
                  ? "We couldn't find any houses matching your search criteria. Try adjusting your filters."
                  : "The village is completely empty! Subscribe to claim the very first plot."}
              </p>
              {isAuthenticated && !searchQuery && statusFilter === "ALL" && userHouses.length === 0 && (
                <Button size="lg" className="px-8 bg-primary text-primary-foreground" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Claim First House
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* House Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentHouses.map((house, index) => (
                  <FadeIn key={house.id} delay={index * 0.1}>
                    <Card
                      className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-accent/40 transition-all duration-300 h-full hover:scale-105 hover:shadow-lg group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/20 p-3 rounded-lg group-hover:bg-accent/20 transition-colors">
                          <Home className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
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
                  </FadeIn>
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
