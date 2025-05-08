
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentCard, { ContentCardProps } from "@/components/ContentCard";
import { Filter, ArrowUpDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data
const sampleCards: Omit<ContentCardProps, "onViewDetails">[] = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript to build your first website from scratch.",
    category: "Development",
    date: "May 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070",
    tags: ["HTML", "CSS", "JavaScript", "Beginner"]
  },
  {
    id: "2",
    title: "Machine Learning Fundamentals",
    description: "Dive into the world of ML with Python and scikit-learn. Perfect for beginners.",
    category: "Data Science",
    date: "May 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1974",
    tags: ["Python", "Machine Learning", "Data Science"]
  },
  {
    id: "3",
    title: "Advanced React Patterns",
    description: "Master React with advanced patterns like compound components, render props and hooks.",
    category: "Development",
    date: "May 20, 2025",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    tags: ["React", "JavaScript", "Advanced"]
  },
  {
    id: "4",
    title: "Cloud Computing with AWS",
    description: "Get started with Amazon Web Services and learn to deploy scalable applications.",
    category: "Cloud",
    date: "May 25, 2025",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070",
    tags: ["AWS", "Cloud", "DevOps"]
  },
  {
    id: "5",
    title: "Mobile App Development with Flutter",
    description: "Build cross-platform mobile apps with Google's Flutter framework.",
    category: "Mobile",
    date: "June 2, 2025",
    imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2070",
    tags: ["Flutter", "Dart", "Mobile"]
  },
  {
    id: "6",
    title: "Blockchain and Smart Contracts",
    description: "Understanding the fundamentals of blockchain and writing smart contracts with Solidity.",
    category: "Blockchain",
    date: "June 10, 2025",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232",
    tags: ["Blockchain", "Ethereum", "Solidity"]
  },
  {
    id: "7",
    title: "UX Design Principles",
    description: "Learn the key principles of effective user experience design for digital products.",
    category: "Design",
    date: "June 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071",
    tags: ["UX", "Design", "UI"]
  },
  {
    id: "8",
    title: "Cybersecurity Essentials",
    description: "Understand the basics of cybersecurity and how to protect your applications.",
    category: "Security",
    date: "June 20, 2025",
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070",
    tags: ["Security", "Networking", "Privacy"]
  }
];

// Filter and sort types
type Category = "All" | "Development" | "Data Science" | "Cloud" | "Mobile" | "Blockchain" | "Design" | "Security";
type SortOption = "newest" | "oldest" | "a-z" | "z-a";

const ContentCardList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [filteredCards, setFilteredCards] = useState(sampleCards);

  // Filter and sort cards when inputs change
  useEffect(() => {
    let result = [...sampleCards];
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(card => 
        card.title.toLowerCase().includes(lowerSearch) || 
        card.description.toLowerCase().includes(lowerSearch) ||
        card.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(card => card.category === selectedCategory);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setFilteredCards(result);
  }, [searchTerm, selectedCategory, sortOption]);

  const handleViewDetails = (id: string) => {
    console.log("Viewing details for card:", id);
    // Navigate to detail page
    // navigate(`/content/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by title, description or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-40">
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Cloud">Cloud</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Blockchain">Blockchain</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-40">
            <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
              <SelectTrigger>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Card Results */}
      <ScrollArea className="h-[calc(100vh-300px)]">
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <ContentCard 
                key={card.id} 
                {...card} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No content found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSortOption("newest");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ContentCardList;
