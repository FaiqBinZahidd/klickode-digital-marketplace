import React, { useEffect, useState } from 'react';

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function ShootingStars() {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const createStar = (id: number): ShootingStar => {
      const startX = Math.random() * window.innerWidth;
      const startY = -20; // Start just above the screen
      
      return {
        id,
        x: startX,
        y: startY,
        length: Math.random() * 30 + 20, // Shorter trails: 20-50px
        speed: Math.random() * 1.5 + 0.5, // Slower speed: 0.5-2
        opacity: Math.random() * 0.3 + 0.1, // More subtle: 0.1-0.4
      };
    };

    // Create fewer initial stars for minimal effect
    const initialStars = Array.from({ length: 8 }, (_, i) => createStar(i));
    setStars(initialStars);

    // Animation loop
    const animateStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          const newY = star.y + star.speed;
          const newX = star.x + star.speed * 0.3; // Slight diagonal movement
          
          // Reset star if it goes off screen
          if (newY > window.innerHeight + 50 || newX > window.innerWidth + 50) {
            return createStar(star.id);
          }
          
          return {
            ...star,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const interval = setInterval(animateStars, 80); // Slower animation: 12.5 FPS
    
    // Add new stars less frequently
    const starGenerator = setInterval(() => {
      setStars(prevStars => {
        if (prevStars.length < 12) { // Keep max 12 stars
          const newStar = createStar(prevStars.length);
          return [...prevStars, newStar];
        }
        return prevStars;
      });
    }, 4000); // New star every 4 seconds

    return () => {
      clearInterval(interval);
      clearInterval(starGenerator);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.length}px`,
            height: '1px',
            background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, ${star.opacity}), transparent)`,
            transform: `rotate(25deg)`,
            transformOrigin: 'left center',
          }}
        />
      ))}
    </div>
  );
}