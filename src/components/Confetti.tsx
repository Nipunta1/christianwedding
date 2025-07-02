import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  originElement?: HTMLElement | null;
}

const Confetti: React.FC<ConfettiProps> = ({ originElement }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    startX: number;
    startY: number;
    velocityX: number;
    velocityY: number;
    color: string;
    size: number;
    shape: string;
    delay: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  useEffect(() => {
    // Metallic colors for luxury feel
    const colors = [
      '#FFD700', // Gold
      '#C0C0C0', // Silver
      '#E8B4B8', // Rose Gold
      '#CD7F32', // Bronze
      '#B8860B', // Dark Gold
      '#F5DEB3', // Wheat Gold
      '#DAA520', // Goldenrod
      '#FFF8DC'  // Cornsilk
    ];
    
    const shapes = ['circle', 'square', 'triangle', 'diamond'];
    
    // Get origin position from the card or use center of screen
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;
    
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }
    
    const newParticles = Array.from({ length: 60 }, (_, i) => {
      // Create 180-degree arc spread
      const angle = (Math.PI / 180) * (Math.random() * 180 - 90); // -90 to +90 degrees
      const velocity = 2 + Math.random() * 4; // Random velocity
      
      return {
        id: i,
        startX: originX,
        startY: originY,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity - Math.random() * 2, // Slight upward bias
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      };
    });
    
    setParticles(newParticles);

    // Clean up particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [originElement]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle-luxury"
          style={{
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: particle.shape === 'circle' ? '50%' : particle.shape === 'triangle' ? '0' : '2px',
            clipPath: particle.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                     particle.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
            animationDelay: `${particle.delay}s`,
            '--velocity-x': particle.velocityX,
            '--velocity-y': particle.velocityY,
            '--rotation-speed': particle.rotationSpeed,
            '--initial-rotation': particle.rotation,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
            border: '1px solid rgba(255,255,255,0.2)'
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Confetti;