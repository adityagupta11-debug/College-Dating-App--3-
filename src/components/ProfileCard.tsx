import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import tridentLogo from 'figma:asset/970e3860c3f3288c2595ad1e61ff4ee6c52813b4.png';
import sparkyLogo from 'figma:asset/7da74a68038b3573e504dd82d375265a2d0b9530.png';

export interface Profile {
  id: string;
  name: string;
  age: number;
  major: string;
  year: string;
  bio: string;
  photos: string[];
  interests: string[];
  distance: number;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'super') => void;
}

export function ProfileCard({ profile, onSwipe }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="overflow-hidden bg-card shadow-xl">
        <div className="relative h-96">
          <ImageWithFallback
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl">{profile.name}, {profile.age}</h2>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {profile.distance} mi
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">{profile.major} • {profile.year}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.interests.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-3 justify-center items-end">
            <button
              onClick={() => onSwipe('left')}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-destructive hover:bg-destructive transition-colors"
              title="Pitchfork Down - Pass"
            >
              <img 
                src={tridentLogo} 
                alt="Dislike" 
                className="w-6 h-6 object-contain rotate-180 filter brightness-0 invert-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(1345%) hue-rotate(328deg) brightness(85%) contrast(97%)' }}
              />
            </button>
            
            <button
              onClick={() => onSwipe('super')}
              className="flex items-center justify-center w-16 h-16 rounded-full border-3 transition-all transform hover:scale-105 shadow-lg"
              style={{
                borderColor: '#FFC627', 
                backgroundColor: 'linear-gradient(135deg, #FFC627, #FFD700)',
                background: 'linear-gradient(135deg, #FFC627, #FFD700)',
                boxShadow: '0 4px 15px rgba(255, 198, 39, 0.3)'
              }}
              title="Super Like with Sparky!"
            >
              <img 
                src={sparkyLogo} 
                alt="Super Like - Sparky" 
                className="w-10 h-10 object-contain"
              />
            </button>
            
            <button
              onClick={() => onSwipe('right')}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors"
              style={{borderColor: '#FFC627', backgroundColor: 'transparent'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFC627';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Pitchfork Up - Like"
            >
              <img 
                src={tridentLogo} 
                alt="Like" 
                className="w-6 h-6 object-contain"
                style={{ filter: 'brightness(0) saturate(100%) invert(84%) sepia(100%) saturate(490%) hue-rotate(4deg) brightness(106%) contrast(101%)' }}
              />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}