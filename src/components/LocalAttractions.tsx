import React from 'react';
import { MapPin, Star, Utensils, Building, Camera, Mountain, Navigation } from 'lucide-react';
import { Attraction } from '../types';

const LocalAttractions: React.FC = () => {
  const attractions: Attraction[] = [
    {
      id: '1',
      name: 'The Garden Restaurant',
      description: 'Fine dining with romantic ambiance and garden views',
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '0.5 miles from venue',
      type: 'restaurant'
    },
    {
      id: '2',
      name: 'Heritage Boutique Hotel',
      description: 'Luxury accommodations with historic charm',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '0.2 miles from venue',
      type: 'hotel'
    },
    {
      id: '3',
      name: 'Cathedral Gardens',
      description: 'Beautiful botanical gardens perfect for peaceful walks',
      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '0.3 miles from venue',
      type: 'activity'
    },
    {
      id: '4',
      name: 'Historic Downtown Square',
      description: 'Charming cobblestone streets with local shops and cafes',
      image: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
      distance: '0.7 miles from venue',
      type: 'landmark'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'hotel': return <Building className="w-5 h-5" />;
      case 'activity': return <Camera className="w-5 h-5" />;
      case 'landmark': return <Mountain className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'restaurant': return 'text-orange-600 bg-orange-100';
      case 'hotel': return 'text-blue-600 bg-blue-100';
      case 'activity': return 'text-green-600 bg-green-100';
      case 'landmark': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const openDirections = (attractionName: string) => {
    const encodedName = encodeURIComponent(attractionName);
    window.open(`https://www.google.com/maps/search/${encodedName}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl animate-slideInUp group" style={{ animationDelay: '0.9s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/95 via-purple-50/95 to-indigo-100/95 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-200/20 via-purple-200/20 to-indigo-200/20 animate-gradientShift" style={{ animationDelay: '5s' }}></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-8">
          <MapPin className="w-6 h-6 text-violet-600 mr-3 animate-wiggle" />
          <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-blur-unblur group-hover:text-violet-900 transition-colors duration-300" style={{ animationDelay: '1.1s' }}>Local Attractions</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {attractions.map((attraction, index) => (
            <div 
              key={attraction.id} 
              className="relative overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeInScale"
              style={{ animationDelay: `${1.3 + index * 0.2}s` }}
            >
              <div className="relative h-48">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(attraction.type)}`}>
                    {getIcon(attraction.type)}
                    <span className="capitalize">{attraction.type}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                    {attraction.name}
                  </h4>
                  <p className="text-white/90 text-sm mb-2 drop-shadow-lg">
                    {attraction.description}
                  </p>
                  <p className="text-amber-200 text-xs drop-shadow-lg">
                    {attraction.distance}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <button
                  onClick={() => openDirections(attraction.name)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalAttractions;