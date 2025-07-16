import React, { useState, useEffect } from 'react';
import { Heart, Cross } from 'lucide-react';

interface EntranceScreenProps {
  onEnter: () => void;
}

const EntranceScreen: React.FC<EntranceScreenProps> = ({ onEnter }) => {
  const [showContent, setShowContent] = useState(false);
  const [doveFlying, setDoveFlying] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setDoveFlying(false);
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-amber-50 relative overflow-hidden">
      {/* Animated Cloud Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-16 bg-white/30 rounded-full blur-xl animate-pulse opacity-60"></div>
        <div className="absolute top-20 right-20 w-40 h-20 bg-white/40 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-16 w-36 h-18 bg-white/35 rounded-full blur-xl animate-pulse opacity-55" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-28 h-14 bg-white/45 rounded-full blur-2xl animate-pulse opacity-45" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Light Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Stained Glass Shimmer Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-xl animate-shimmer"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl animate-shimmer" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-br from-red-400 to-pink-400 rounded-full blur-xl animate-shimmer" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-br from-green-400 to-teal-400 rounded-full blur-xl animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Sunrays Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/40 via-transparent to-transparent rotate-12 animate-pulse"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/30 via-transparent to-transparent -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-200/35 via-transparent to-transparent rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Flying Dove Animation */}
      <div className={`absolute transition-all duration-2000 ease-out ${
        doveFlying ? 'top-20 -left-20 rotate-12' : 'top-40 left-1/2 transform -translate-x-1/2 rotate-0'
      }`}>
        <div className="relative">
          <Heart className="w-8 h-8 text-white drop-shadow-lg animate-pulse" fill="white" />
          <div className="absolute -top-2 -right-2">
            <Cross className="w-4 h-4 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className={`text-center transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <Cross className="w-12 h-12 mx-auto mb-4 text-amber-700 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-serif mb-4 font-bold gradient-text animate-text-glow">
              Sacred Union
            </h1>
            <p className="text-lg md:text-xl text-amber-300 font-medium italic luxury-text animate-fadeInScale" style={{ animationDelay: '1.5s' }}>
              <span className="italic text-amber-200 luxury-serif animate-slideInUp" style={{ animationDelay: '1.8s' }}>
                A Blessed Celebration in Christ
              </span>
            </p>
          </div>

          <div className="relative group">
            <button
              onClick={onEnter}
              className="relative bg-gradient-to-r from-amber-100 via-white to-amber-100 hover:from-amber-200 hover:via-amber-50 hover:to-amber-200 px-10 py-5 rounded-full border-2 border-amber-300 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
            >
              <div className="flex items-center space-x-3">
                <Cross className="w-5 h-5 text-amber-700" />
                <span className="text-amber-800 font-medium text-lg">
                  Step Into Our Blessed Day
                </span>
                <Cross className="w-5 h-5 text-amber-700" />
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-200/50 via-white/50 to-amber-200/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-700 font-medium italic animate-pulse">
            "Love is patient, love is kind" - 1 Corinthians 13:4
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntranceScreen;