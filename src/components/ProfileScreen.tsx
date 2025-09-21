import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Camera, Edit, Plus, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfile {
  name: string;
  age: number;
  major: string;
  year: string;
  bio: string;
  photos: string[];
  interests: string[];
}

const defaultProfile: UserProfile = {
  name: 'Your Name',
  age: 20,
  major: 'Your Major',
  year: 'Sophomore',
  bio: 'Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?',
  photos: ['https://images.unsplash.com/photo-1559686216-552c993a7e64?w=400'],
  interests: ['Sun Devils Sports', 'Study Groups', 'Campus Life']
};

const availableInterests = [
  'Sun Devils Sports', 'Basketball', 'Football', 'Baseball',
  'Hiking', 'Rock Climbing', 'Mountain Biking', 'Running',
  'Photography', 'Art', 'Music', 'Dancing',
  'Coding', 'Engineering', 'Business', 'Psychology',
  'Coffee', 'Boba', 'Cooking', 'Food',
  'Gaming', 'Movies', 'Books', 'Netflix',
  'Yoga', 'Fitness', 'Gym', 'Swimming',
  'Travel', 'Adventure', 'Camping', 'Road Trips',
  'Study Groups', 'Campus Life', 'Greek Life', 'Volunteering'
];

export function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const handleAddInterest = (interest: string) => {
    if (!profile.interests.includes(interest)) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
    setNewInterest('');
  };

  const handleRemoveInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Your Profile</h1>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-64">
          <ImageWithFallback
            src={profile.photos[0]}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button size="sm" variant="secondary">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Age</label>
              {isEditing ? (
                <Input
                  type="number"
                  value={profile.age}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: Number(e.target.value) }))}
                />
              ) : (
                <p>{profile.age}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Major</label>
              {isEditing ? (
                <Input
                  value={profile.major}
                  onChange={(e) => setProfile(prev => ({ ...prev, major: e.target.value }))}
                />
              ) : (
                <p>{profile.major}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Year</label>
              {isEditing ? (
                <select
                  value={profile.year}
                  onChange={(e) => setProfile(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option>Freshman</option>
                  <option>Sophomore</option>
                  <option>Junior</option>
                  <option>Senior</option>
                  <option>Graduate</option>
                </select>
              ) : (
                <p>{profile.year}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Bio</label>
            {isEditing ? (
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
              />
            ) : (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-3">Interests</label>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <Badge key={interest} variant="default" className="flex items-center gap-1">
                    {interest}
                    {isEditing && (
                      <button onClick={() => handleRemoveInterest(interest)}>
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>

              {isEditing && (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom interest..."
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && newInterest && handleAddInterest(newInterest)}
                    />
                    <Button
                      size="sm"
                      onClick={() => newInterest && handleAddInterest(newInterest)}
                      disabled={!newInterest}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Popular interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableInterests
                        .filter(interest => !profile.interests.includes(interest))
                        .slice(0, 12)
                        .map((interest) => (
                          <Button
                            key={interest}
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddInterest(interest)}
                          >
                            + {interest}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {!isEditing && (
        <div className="text-center">
          <Button className="hover:opacity-90" style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}>
            Start Swiping!
          </Button>
        </div>
      )}
    </div>
  );
}