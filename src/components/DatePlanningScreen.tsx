import { useState } from 'react';
import { Profile } from './ProfileCard';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, MapPin, Clock, DollarSign, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DateIdea {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  priceRange: string;
  category: string;
  rating: number;
  image: string;
  whyPerfect: string;
}

interface DatePlanningScreenProps {
  selectedMatch: Profile | null;
  onBack: () => void;
}

const dateIdeas: DateIdea[] = [
  {
    id: '1',
    title: 'Desert Botanical Garden',
    description: 'Explore beautiful desert plants and art installations together',
    location: 'Phoenix, AZ',
    duration: '2-3 hours',
    priceRange: '$25-30',
    category: 'Nature',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    whyPerfect: 'Perfect for nature lovers with great photo opportunities!'
  },
  {
    id: '2',
    title: 'Tempe Town Lake Kayaking',
    description: 'Paddle together on the scenic lake right near campus',
    location: 'Tempe, AZ',
    duration: '1-2 hours',
    priceRange: '$40-60',
    category: 'Adventure',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1502780402662-acc01917256e?w=400',
    whyPerfect: 'Active and fun, plus beautiful views of the city skyline!'
  },
  {
    id: '3',
    title: 'Roosevelt Row Art Walk',
    description: 'Explore local galleries, street art, and grab coffee',
    location: 'Downtown Phoenix',
    duration: '2-4 hours',
    priceRange: '$15-25',
    category: 'Culture',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400',
    whyPerfect: 'Great for creative souls who love art and conversation!'
  },
  {
    id: '4',
    title: 'Camelback Mountain Hike',
    description: 'Watch the sunset from one of Phoenix\'s most iconic peaks',
    location: 'Phoenix, AZ',
    duration: '2-3 hours',
    priceRange: 'Free',
    category: 'Outdoor',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1729895618031-c51320af6d90?w=400',
    whyPerfect: 'Adventurous and romantic with stunning desert views!'
  },
  {
    id: '5',
    title: 'Mill Avenue District',
    description: 'Dinner and drinks in ASU\'s vibrant entertainment district',
    location: 'Tempe, AZ',
    duration: '3-4 hours',
    priceRange: '$50-80',
    category: 'Dining',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    whyPerfect: 'Classic college date night with lots of options!'
  },
  {
    id: '6',
    title: 'Phoenix Zoo Lights',
    description: 'Evening stroll through illuminated animal exhibits',
    location: 'Phoenix, AZ',
    duration: '2-3 hours',
    priceRange: '$30-40',
    category: 'Entertainment',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
    whyPerfect: 'Magical evening atmosphere perfect for getting to know each other!'
  }
];

export function DatePlanningScreen({ selectedMatch, onBack }: DatePlanningScreenProps) {
  const [selectedIdea, setSelectedIdea] = useState<DateIdea | null>(null);

  if (!selectedMatch) return null;

  const getPersonalizedIdeas = () => {
    // Simple algorithm to suggest dates based on interests
    return dateIdeas.map(idea => ({
      ...idea,
      score: selectedMatch.interests.some(interest => 
        idea.category.toLowerCase().includes(interest.toLowerCase()) ||
        idea.title.toLowerCase().includes(interest.toLowerCase()) ||
        idea.description.toLowerCase().includes(interest.toLowerCase())
      ) ? 1 : 0
    })).sort((a, b) => b.score - a.score);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl">Plan a Date</h1>
          <p className="text-sm text-muted-foreground">with {selectedMatch.name}</p>
        </div>
      </div>

      {selectedIdea ? (
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="h-48 relative">
              <ImageWithFallback
                src={selectedIdea.image}
                alt={selectedIdea.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {selectedIdea.rating}
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-xl mb-2">{selectedIdea.title}</h2>
                <p className="text-muted-foreground">{selectedIdea.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4" />
                  {selectedIdea.location}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  {selectedIdea.duration}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-4 h-4" />
                  {selectedIdea.priceRange}
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Why this is perfect:</strong> {selectedIdea.whyPerfect}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setSelectedIdea(null)}
                  variant="outline" 
                  className="flex-1"
                >
                  Back to Options
                </Button>
                <Button 
                  className="flex-1 hover:opacity-90"
                  style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}
                >
                  Send Invitation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="mb-2">Perfect Dates for You & {selectedMatch.name}</h2>
            <p className="text-sm text-muted-foreground">
              Based on your shared interests: {selectedMatch.interests.slice(0, 2).join(', ')}
            </p>
          </div>
          
          <div className="grid gap-4">
            {getPersonalizedIdeas().map((idea) => (
              <Card 
                key={idea.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="flex gap-4 p-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={idea.image}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="truncate">{idea.title}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3 h-3 fill-current text-yellow-500" />
                        {idea.rating}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {idea.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {idea.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {idea.priceRange} • {idea.duration}
                      </span>
                      {idea.score > 0 && (
                        <Badge variant="default" className="text-xs" style={{backgroundColor: '#FFC627', color: '#8C1D40'}}>
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}