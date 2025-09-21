import { Profile } from './ProfileCard';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { MessageCircle, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import sparkyLogo from 'figma:asset/7da74a68038b3573e504dd82d375265a2d0b9530.png';

interface MatchesScreenProps {
  matches: Profile[];
  onPlanDate: (profile: Profile) => void;
}

export function MatchesScreen({ matches, onPlanDate }: MatchesScreenProps) {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-16 h-16 mb-4 p-2 opacity-50">
          <img 
            src={sparkyLogo} 
            alt="Sparky" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl mb-2">No matches yet</h2>
        <p className="text-muted-foreground text-center">
          Keep swiping to find your perfect Sun Devil match!
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl mb-6">Your Matches</h1>
      
      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="truncate">{match.name}, {match.age}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {match.major} • {match.year}
                </p>
                <p className="text-xs text-muted-foreground">
                  {match.distance} miles away
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={() => onPlanDate(match)}
                  style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}
                  className="hover:opacity-90"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Plan Date
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}