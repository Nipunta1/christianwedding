import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const PhotoCarousel: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  const photos = [
    {
      url: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Our Engagement at the Chapel"
    },
    {
      url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Prayer and Fellowship"
    },
    {
      url: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Blessed Moments Together"
    },
    {
      url: "https://images.pexels.com/photos/1444452/pexels-photo-1444452.jpeg?auto=compress&cs=tinysrgb&w=800",
      caption: "Walking in Faith"
    }
  ];

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl animate-slideInUp" style={{ animationDelay: '0.8s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/95 via-rose-50/95 to-red-100/95 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-rose-200/20 to-red-200/20 animate-gradientShift" style={{ animationDelay: '7s' }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-8">
          <Heart className="w-6 h-6 text-pink-600 mr-3" fill="currentColor" />
          <h3 className="text-2xl font-serif text-gray-800">Our Precious Memories</h3>
        </div>
        
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <img
              key={currentPhoto}
              src={photos[currentPhoto].url}
              alt={photos[currentPhoto].caption}
              className="w-full h-64 md:h-80 object-cover transition-all duration-500 animate-crossFade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-medium text-xl drop-shadow-lg">
                {photos[currentPhoto].caption}
              </p>
            </div>
          </div>
          
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhoto(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPhoto ? 'bg-pink-600 scale-125' : 'bg-pink-200 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoCarousel;