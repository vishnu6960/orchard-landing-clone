
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl?: string;
  tags: string[];
  onViewDetails: (id: string) => void;
}

const ContentCard = ({
  id,
  title,
  description,
  category,
  date,
  imageUrl,
  tags,
  onViewDetails
}: ContentCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1">{title}</CardTitle>
            <CardDescription className="text-sm mt-1">{date}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onViewDetails(id)} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
