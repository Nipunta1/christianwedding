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
    // Metallic colors for luxury feel
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
    
    // Get origin position from the card or use center of screen
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;
    
    if (originElement) {
      const rect = originElement.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }
    
    // Create multiple waves of particles for better effect
    const createParticleWave = (waveIndex: number, particleCount: number) => {
      return Array.from({ length: particleCount }, (_, i) => {
        // Create full 360-degree spread with bias towards upward direction
        const baseAngle = (Math.PI * 2 * i) / particleCount;
        const angleVariation = (Math.random() - 0.5) * 0.5; // Add some randomness
        const angle = baseAngle + angleVariation;
        
        // Vary velocity based on wave and particle
        const baseVelocity = 3 + Math.random() * 6; // Increased base velocity
        const velocity = baseVelocity * (1 + waveIndex * 0.3); // Later waves go further
        
        // Add upward bias for more natural confetti effect
        const upwardBias = Math.random() * 2;
        
        return {
          id: waveIndex * 1000 + i,
          startX: originX + (Math.random() - 0.5) * 40, // Small random offset from center
          startY: originY + (Math.random() - 0.5) * 40,
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity - upwardBias, // Upward bias
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 12 + 6, // Larger particles
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          delay: waveIndex * 0.2 + Math.random() * 0.3, // Staggered waves
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15, // Faster rotation
          duration: 6 + Math.random() * 3 // Longer duration
        };
      });
    };
    
    // Create multiple waves of particles
    const allParticles = [
      ...createParticleWave(0, 40), // First wave - 40 particles
      ...createParticleWave(1, 35), // Second wave - 35 particles
      ...createParticleWave(2, 30), // Third wave - 30 particles
      ...createParticleWave(3, 25)  // Fourth wave - 25 particles
    ];
    
    setParticles(allParticles);

    // Clean up particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 10000); // Longer cleanup time

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
          borderRadius: '2px',
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
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall-enhanced"
          style={{
            left: `${particle.startX}px`,
            top: `${particle.startY}px`,
            backgroundColor: particle.color,
            ...getShapeStyles(particle.shape, particle.size),
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            '--velocity-x': particle.velocityX,
            '--velocity-y': particle.velocityY,
            '--rotation-speed': particle.rotationSpeed,
            '--initial-rotation': particle.rotation,
            boxShadow: `0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)`,
            border: '1px solid rgba(255,255,255,0.3)',
            filter: 'brightness(1.1) saturate(1.2)',
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default Confetti;