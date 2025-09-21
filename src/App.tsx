import { useState } from 'react';
import { SwipeScreen } from './components/SwipeScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { DatePlanningScreen } from './components/DatePlanningScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SignupScreen } from './components/SignupScreen';
import { ThemeProvider } from './components/ThemeProvider';
import { Profile } from './components/ProfileCard';
import { Button } from './components/ui/button';
import { Heart, Users, User, Calendar, Settings } from 'lucide-react';
import sparkyLogo from 'figma:asset/7da74a68038b3573e504dd82d375265a2d0b9530.png';

type Screen = 'swipe' | 'matches' | 'profile' | 'date-planning' | 'settings';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('swipe');
  const [matches, setMatches] = useState<Profile[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleMatch = (profile: Profile) => {
    setMatches(prev => {
      // Prevent duplicate matches by checking if profile already exists
      if (prev.some(match => match.id === profile.id)) {
        return prev;
      }
      return [...prev, profile];
    });
  };

  const handlePlanDate = (profile: Profile) => {
    setSelectedMatch(profile);
    setCurrentScreen('date-planning');
  };

  const handleBackFromDatePlanning = () => {
    setSelectedMatch(null);
    setCurrentScreen('matches');
  };

  const handleSignupComplete = (email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'swipe':
        return <SwipeScreen onMatch={handleMatch} />;
      case 'matches':
        return <MatchesScreen matches={matches} onPlanDate={handlePlanDate} />;
      case 'profile':
        return <ProfileScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'date-planning':
        return (
          <DatePlanningScreen 
            selectedMatch={selectedMatch} 
            onBack={handleBackFromDatePlanning}
          />
        );
      default:
        return <SwipeScreen onMatch={handleMatch} />;
    }
  };

  // Show signup screen if not authenticated
  if (!isAuthenticated) {
    return <SignupScreen onSignupComplete={handleSignupComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-4 shadow-lg" style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center p-1">
              <img 
                src={sparkyLogo} 
                alt="Spark'd Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg">Spark'd</h1>
              <p className="text-xs text-yellow-100">Where the devil dates</p>
            </div>
          </div>
          {matches.length > 0 && currentScreen === 'swipe' && (
            <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-background min-h-[calc(100vh-140px)] shadow-xl">
        {currentScreen !== 'date-planning' && renderScreen()}
        {currentScreen === 'date-planning' && renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'date-planning' && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto flex">
            <Button
              variant={currentScreen === 'swipe' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('swipe')}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Discover</span>
            </Button>
            
            <Button
              variant={currentScreen === 'matches' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1 relative"
              onClick={() => setCurrentScreen('matches')}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Matches</span>
              {matches.length > 0 && (
                <div className="absolute top-2 right-2 w-5 h-5 text-white rounded-full text-xs flex items-center justify-center" style={{backgroundColor: '#FFC627', color: '#8C1D40'}}>
                  {matches.length}
                </div>
              )}
            </Button>
            
            <Button
              variant={currentScreen === 'profile' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('profile')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Button>
            
            <Button
              variant={currentScreen === 'settings' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}