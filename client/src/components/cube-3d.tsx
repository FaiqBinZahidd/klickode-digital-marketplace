interface Cube3DProps {
  size?: number;
  animation?: string;
  className?: string;
}

export default function Cube3D({ 
  size = 128, 
  animation = "animate-float", 
  className = "" 
}: Cube3DProps) {
  const halfSize = size / 2;
  
  return (
    <div className={`cube-3d ${animation} ${className}`}>
      <div
        className="relative transform-gpu"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div
          className="cube-face front"
          style={{
            transform: `translateZ(${halfSize}px)`,
          }}
        ></div>
        <div
          className="cube-face back"
          style={{
            transform: `translateZ(-${halfSize}px) rotateY(180deg)`,
          }}
        ></div>
        <div
          className="cube-face right"
          style={{
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
        ></div>
        <div
          className="cube-face left"
          style={{
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
        ></div>
        <div
          className="cube-face top"
          style={{
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          }}
        ></div>
        <div
          className="cube-face bottom"
          style={{
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
