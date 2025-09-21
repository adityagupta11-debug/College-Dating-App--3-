import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { GraduationCap, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import sparkyLogo from 'figma:asset/7da74a68038b3573e504dd82d375265a2d0b9530.png';

interface SignupScreenProps {
  onSignupComplete: (email: string) => void;
}

export function SignupScreen({ onSignupComplete }: SignupScreenProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidASUEmail = (email: string) => {
    const asuEmailRegex = /^[a-zA-Z0-9._%+-]+@(asu\.edu|asurite\.asu\.edu)$/i;
    return asuEmailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsValidating(true);

    // Validate ASU email
    if (!isValidASUEmail(email)) {
      setError('Please use your official ASU email address (@asu.edu)');
      setIsValidating(false);
      return;
    }

    // Validate name fields
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      setIsValidating(false);
      return;
    }

    // Simulate email verification process
    setTimeout(() => {
      setIsValidating(false);
      setSuccess(true);
      
      // Complete signup after showing success message
      setTimeout(() => {
        onSignupComplete(email);
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-900 to-red-950 flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #8C1D40, #7A1936, #6B1530)'}}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400/20 rounded-full flex items-center justify-center p-2">
            <img 
              src={sparkyLogo} 
              alt="Spark'd Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl mb-2">Welcome to Spark'd!</h2>
          <p className="text-yellow-100 mb-4">Your ASU email has been verified successfully.</p>
          <div className="animate-pulse text-yellow-200">
            Setting up your profile...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-red-900 to-red-950 flex items-center justify-center p-4" style={{background: 'linear-gradient(135deg, #8C1D40, #7A1936, #6B1530)'}}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center text-white mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
            <img 
              src={sparkyLogo} 
              alt="Spark'd Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl mb-2">Spark'd</h1>
          <p className="text-yellow-100">Where the devil dates</p>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r mx-auto mb-3 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(to right, #8C1D40, #FFC627)'}}>
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl">Join Spark'd</h2>
              <p className="text-muted-foreground text-sm">
                Where ASU devils find their perfect match
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ASU Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@asu.edu"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send a verification link to your ASU email
              </p>
            </div>

            {error && (
              <Alert className="border-destructive">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r text-white hover:opacity-90 transition-opacity"
              style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}
              disabled={isValidating}
            >
              {isValidating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying ASU Email...
                </div>
              ) : (
                'Get Started with Spark\'d'
              )}
            </Button>

            <div className="text-center text-xs text-muted-foreground space-y-2">
              <p>
                Only ASU students with valid @asu.edu email addresses can join
              </p>
              <p>
                By signing up, you agree to connect with fellow Sun Devils in a respectful environment
              </p>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6 text-white/80 text-sm">
          <p>🍴 Fork yeah! Let's find your perfect match 🍴</p>
        </div>
      </motion.div>
    </div>
  );
}