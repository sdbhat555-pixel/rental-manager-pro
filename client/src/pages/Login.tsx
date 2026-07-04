import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any email/password combination
      toast.success(isSignUp ? 'Account created successfully!' : 'Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a1f35] pointer-events-none" />
      
      {/* Animated accent circles */}
      <div className="absolute top-20 right-10 w-40 h-40 rounded-full border border-accent/10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full border border-accent/10 animate-pulse pointer-events-none" style={{ animationDelay: '0.5s' }} />

      {/* Login card */}
      <Card className="relative z-10 w-full max-w-md p-8 border-accent/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent/80 mx-auto mb-4">
            <div className="text-2xl font-bold text-accent-foreground">RM</div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Rental Manager Pro</h1>
          <p className="text-sm text-accent mt-1">Smart. Simple. Secure.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {isSignUp ? 'Full Name' : 'Email'}
            </label>
            <Input
              type={isSignUp ? 'text' : 'email'}
              placeholder={isSignUp ? 'John Doe' : 'you@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/50"
              disabled={isLoading}
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-muted border-muted-foreground/20 text-foreground placeholder:text-muted-foreground/50"
              disabled={isLoading}
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 rounded-lg transition-all duration-200 mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </Button>
        </form>

        {/* Toggle between login and signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmail('');
                setPassword('');
              }}
              className="ml-1 text-accent hover:text-accent/80 font-semibold transition-colors"
              disabled={isLoading}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-muted-foreground/10 text-center">
          <p className="text-xs text-muted-foreground">
            Developed by <span className="text-accent font-semibold">Shahid Ibn Rashid</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
