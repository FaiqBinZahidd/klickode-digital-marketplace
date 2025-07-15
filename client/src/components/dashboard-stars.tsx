import React, { useEffect, useState } from 'react';

interface FlyingStar {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  opacity: number;
}

export default function DashboardStars() {
  const [stars, setStars] = useState<FlyingStar[]>([]);

  useEffect(() => {
    const createStar = (id: number): FlyingStar => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 800 + 400; // Start from far away
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      return {
        id,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 1,
        angle,
        opacity: Math.random() * 0.6 + 0.4,
      };
    };

    const initialStars = Array.from({ length: 20 }, (_, i) => createStar(i));
    setStars(initialStars);

    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const dx = centerX - star.x;
          const dy = centerY - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 50) {
            // Reset star when it reaches center
            return createStar(star.id);
          }
          
          return {
            ...star,
            x: star.x + (dx / distance) * star.speed,
            y: star.y + (dy / distance) * star.speed,
          };
        })
      );
    };

    const interval = setInterval(animateStars, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[#ff3434] animate-pulse"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 52, 52, 0.6)`,
          }}
        />
      ))}
    </div>
  );
}