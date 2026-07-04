import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function SplashScreen() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden relative">
      {/* Premium gradient background with subtle animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[#1a1f35] pointer-events-none" />
      
      {/* Animated accent circles for luxury feel */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-accent/20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-accent/10 animate-pulse" style={{ animationDelay: '0.5s' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-6">
        {/* Logo placeholder - elegant geometric design */}
        <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-2xl">
          <div className="text-4xl font-bold text-accent-foreground">RM</div>
        </div>

        {/* App name */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
            Rental Manager Pro
          </h1>
        </div>

        {/* Tagline */}
        <div className="text-center mt-4">
          <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
            Smart. Simple. Secure.
          </p>
        </div>

        {/* Animated loading indicator */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Gold progress bar animation */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent via-accent to-accent/60 rounded-full"
              style={{
                animation: 'slideInfinite 2s ease-in-out infinite',
              }}
            />
          </div>

          {/* Spinner animation */}
          <div className="relative w-12 h-12">
            <div 
              className="absolute inset-0 rounded-full border-2 border-muted border-t-accent"
              style={{
                animation: 'spin 2s linear infinite',
              }}
            />
          </div>
        </div>

        {/* Developer credit */}
        <div className="mt-16 text-center">
          <p className="text-sm md:text-base text-accent font-light">
            Developed by Shahid Ibn Rashid
          </p>
        </div>
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes slideInfinite {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
