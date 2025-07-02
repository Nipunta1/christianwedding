import React from 'react';
import { Heart, Church, Calendar } from 'lucide-react';

interface SaveTheDatePageProps {
  onContinue: () => void;
}

const SaveTheDatePage: React.FC<SaveTheDatePageProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 py-8 px-4 relative overflow-hidden">
      {/* Animated Golden Light Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-100/30 via-transparent to-rose-100/30"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Falling Petals Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-rose-200/60 rounded-full animate-falling-petals opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`white-${i}`}
            className="absolute w-2 h-2 bg-white/80 rounded-full animate-falling-petals opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Light Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Church Altar Silhouette */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-amber-200/20 to-transparent rounded-t-full blur-xl"></div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Heart className="w-8 h-8 mx-auto mb-4 text-amber-600 animate-pulse" fill="currentColor" />
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">
            By the Grace of God
          </h1>
          <p className="text-xl text-amber-700 font-light">You Are Invited</p>
        </div>

        {/* Couple Photo with Christ and Church Altar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-amber-200 shadow-2xl">
              <img
                src="/jesus.webp"
                alt="Sacred Heart of Jesus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg animate-pulse">
              <Church className="w-6 h-6 text-amber-600" />
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/30 to-rose-200/30 blur-xl animate-pulse opacity-60"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-amber-100 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 right-4 w-16 h-16 bg-amber-300 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-rose-300 rounded-full"></div>
          </div>
          
          {/* Subtle background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-rose-50/20 animate-shimmer opacity-30"></div>
          
          <div className="text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 leading-relaxed">
              <span className="text-amber-700 font-medium">Sarah Elizabeth</span>
              <span className="text-gray-600 mx-4">&</span>
              <span className="text-amber-700 font-medium">Michael James</span>
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              joyfully invite you to witness their union, under God's blessing
            </p>

            <div className="flex items-center justify-center mb-6 text-gray-600">
              <Calendar className="w-5 h-5 mr-3 text-amber-600" />
              <span className="text-lg">Saturday, June 15th, 2024</span>
            </div>

            <div className="flex items-center justify-center mb-8 text-gray-600">
              <Church className="w-5 h-5 mr-3 text-amber-600" />
              <span className="text-lg">St. Mary's Cathedral</span>
            </div>

            <div className="border-t border-amber-200 pt-6 mb-6">
              <p className="text-gray-600 text-base">
                <span className="font-medium text-gray-800">Dear Guest,</span>
              </p>
              <p className="text-gray-600 text-base mt-2">
                Your presence would be a blessing as we begin our journey as one in Christ.
              </p>
            </div>

            <button
              onClick={onContinue}
              className="group relative bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 font-medium flex items-center space-x-2">
                <Heart className="w-4 h-4" fill="currentColor" />
                <span>Enter the Celebration</span>
                <Heart className="w-4 h-4" fill="currentColor" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </button>
          </div>
        </div>

        {/* Bottom Verse */}
        <div className="text-center mt-8">
          <p className="text-gray-500 italic text-sm animate-pulse">
            "Two are better than one" - Ecclesiastes 4:9
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaveTheDatePage;