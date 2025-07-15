import { useEffect, useRef } from "react";

export default function AdvancedCubes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Any additional JavaScript effects can be added here
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="advanced-cubes-container relative w-full h-full flex items-center justify-center"
    >
      {/* First Cube */}
      <div className="cube-advanced" style={{ zIndex: 2 }}>
        <div className="cube-face-advanced" style={{ '--x': -1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 0, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
      </div>

      {/* Second Cube */}
      <div className="cube-advanced" style={{ zIndex: 1, transform: 'translate(-80px, -80px)' }}>
        <div className="cube-face-advanced" style={{ '--x': -1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 0, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
      </div>

      {/* Third Cube */}
      <div className="cube-advanced" style={{ zIndex: 3, transform: 'translate(80px, 80px)' }}>
        <div className="cube-face-advanced" style={{ '--x': -1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 0, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
        <div className="cube-face-advanced" style={{ '--x': 1, '--y': 0 } as any}>
          <span className="cube-span-advanced" style={{ '--i': 3 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 2 } as any}></span>
          <span className="cube-span-advanced" style={{ '--i': 1 } as any}></span>
        </div>
      </div>
    </div>
  );
}