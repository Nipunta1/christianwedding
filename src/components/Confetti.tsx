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
    duration: number;
  }>>([]);

  useEffect(() => {
    // Metallic and vibrant colors for luxury feel
    const colors = [
      '#FFD700', // Gold
      '#C0C0C0', // Silver
      '#E8B4B8', // Rose Gold
      '#CD7F32', // Bronze
      '#B8860B', // Dark Gold
      '#F5DEB3', // Wheat Gold
      '#DAA520', // Goldenrod
      '#FFF8DC', // Cornsilk
      '#FF6B35', // Orange
      '#FF1744', // Red
      '#E91E63', // Pink
      '#9C27B0', // Purple
      '#3F51B5', // Indigo
      '#2196F3', // Blue
      '#00BCD4', // Cyan
      '#4CAF50', // Green
      '#8BC34A', // Light Green
      '#CDDC39'  // Lime
    ];
    
    const shapes = ['circle', 'square', 'triangle', 'diamond', 'star'];
    
    // Get origin position from the card or use center of viewport
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;
    
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Calculate absolute position including scroll
      originX = rect.left + scrollLeft + rect.width / 2;
      originY = rect.top + scrollTop + rect.height / 2;
      
      console.log('Origin calculated:', { originX, originY, rect, scrollTop, scrollLeft });
    } else {
      console.log('No origin element, using viewport center:', { originX, originY });
    }
    
    // Create multiple waves of particles for spectacular effect
    const createParticleWave = (waveIndex: number, particleCount: number) => {
      return Array.from({ length: particleCount }, (_, i) => {
        // Create full 360-degree spread
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
        
        // Vary velocity significantly for better spread
        const baseVelocity = 8 + Math.random() * 12; // Increased base velocity
        const velocity = baseVelocity * (1 + waveIndex * 0.4); // Later waves go much further
        
        // Calculate velocity components
        const velocityX = Math.cos(angle) * velocity;
        const velocityY = Math.sin(angle) * velocity - (Math.random() * 3); // Upward bias
        
        return {
          id: waveIndex * 1000 + i,
          startX: originX + (Math.random() - 0.5) * 60, // Larger random offset
          startY: originY + (Math.random() - 0.5) * 60,
          velocityX,
          velocityY,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 16 + 8, // Larger particles (8-24px)
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          delay: waveIndex * 0.15 + Math.random() * 0.2, // Faster staggered waves
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 20, // Faster rotation
          duration: 8 + Math.random() * 4 // Longer duration (8-12 seconds)
        };
      });
    };
    
    // Create multiple waves with more particles
    const allParticles = [
      ...createParticleWave(0, 50), // First wave - 50 particles
      ...createParticleWave(1, 45), // Second wave - 45 particles
      ...createParticleWave(2, 40), // Third wave - 40 particles
      ...createParticleWave(3, 35), // Fourth wave - 35 particles
      ...createParticleWave(4, 30)  // Fifth wave - 30 particles
    ];
    
    console.log('Created particles:', allParticles.length);
    setParticles(allParticles);

    // Clean up particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 15000); // Longer cleanup time

    return () => clearTimeout(timer);
  }, [originElement]);

  const getShapeStyles = (shape: string, size: number) => {
    const baseStyles = {
      width: `${size}px`,
      height: `${size}px`,
    };

    switch (shape) {
      case 'circle':
        return {
          ...baseStyles,
          borderRadius: '50%',
        };
      case 'square':
        return {
          ...baseStyles,
          borderRadius: '3px',
        };
      case 'triangle':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      case 'diamond':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        };
      case 'star':
        return {
          ...baseStyles,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-spectacular"
          style={{
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            backgroundColor: particle.color,
            ...getShapeStyles(particle.shape, particle.size),
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            '--velocity-x': `${particle.velocityX}px`,
            '--velocity-y': `${particle.velocityY}px`,
            '--rotation-speed': `${particle.rotationSpeed}deg`,
            '--initial-rotation': `${particle.rotation}deg`,
            boxShadow: `0 4px 12px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.5)`,
            border: '2px solid rgba(255,255,255,0.4)',
            filter: 'brightness(1.2) saturate(1.3)',
            transform: `rotate(${particle.rotation}deg)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Confetti;