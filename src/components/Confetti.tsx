import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  originElement?: HTMLElement | null;
}

const Confetti: React.FC<ConfettiProps> = ({ originElement }) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    color: string;
    size: number;
    shape: string;
    delay: number;
    rotation: number;
    rotationSpeed: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    const colors = [
      '#FFD700', '#C0C0C0', '#E8B4B8', '#CD7F32', '#B8860B',
      '#F5DEB3', '#DAA520', '#FFF8DC', '#FF6B35', '#FF1744',
      '#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4',
      '#4CAF50', '#8BC34A', '#CDDC39'
    ];
    
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    
    // Get origin position
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;
    
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }
    
    // Create particles
    const newParticles = Array.from({ length: 100 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 100 + (Math.random() - 0.5) * 0.5;
      const velocity = 5 + Math.random() * 10;
      
      return {
        id: i,
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 40,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity - Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 6,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        duration: 4 + Math.random() * 2
      };
    });
    
    setParticles(newParticles);

    // Clean up after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 8000);

    return () => clearTimeout(timer);
  }, [originElement]);

  const getShapeStyles = (shape: string, size: number) => {
    const baseStyles = {
      width: `${size}px`,
      height: `${size}px`,
    };

    switch (shape) {
      case 'circle':
        return { ...baseStyles, borderRadius: '50%' };
      case 'square':
        return { ...baseStyles, borderRadius: '2px' };
      case 'triangle':
        return { ...baseStyles, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' };
      case 'diamond':
        return { ...baseStyles, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' };
      case 'star':
        return { ...baseStyles, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' };
      default:
        return baseStyles;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            backgroundColor: particle.color,
            ...getShapeStyles(particle.shape, particle.size),
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            '--velocity-x': `${particle.velocityX * 50}px`,
            '--velocity-y': `${particle.velocityY * 50 + 100}vh`,
            '--rotation': `${particle.rotationSpeed * 360}deg`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.3)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Confetti;