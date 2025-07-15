import { useEffect, useState } from "react";

export default function NetlifyBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl floating-animation"></div>
      <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/6 right-1/6 w-4 h-4 bg-blue-400/30 rounded-full floating-animation" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/6 left-1/6 w-3 h-3 bg-purple-400/40 rounded-full floating-animation" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-cyan-400/50 rounded-full floating-animation" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-1/3 left-2/3 w-5 h-5 bg-blue-300/20 rounded-full floating-animation" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Moving light rays */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-pulse"></div>
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/15 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Vertical accent lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/10 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  );
}