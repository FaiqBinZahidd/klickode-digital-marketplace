import React, { useEffect, useRef } from 'react';

interface CheckeredBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function CheckeredBackground({ children, className = "" }: CheckeredBackgroundProps) {
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particlesContainer = particlesContainerRef.current;
    if (!particlesContainer) return;

    let lastTime = 0;
    const throttleDelay = 50; // Only create particles every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleDelay) return;
      lastTime = currentTime;

      const rect = particlesContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const particle = document.createElement('div');
      particle.className = 'particle';

      const size = Math.random() * 6 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.position = 'absolute';
      particle.style.background = 'rgba(255, 255, 255, 0.8)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.left = `${mouseX}px`;
      particle.style.top = `${mouseY}px`;
      particle.style.zIndex = '15';
      particle.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

      particlesContainer.appendChild(particle);

      // Start animation immediately
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
        particle.style.opacity = '0';
      });

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove();
        }
      }, 1500);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Background gradient like hero section */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-space-darker/40 to-black/60 z-0" />
      
      {/* Checkered pattern overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `
        }}
      />
      
      {/* Particles container */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}