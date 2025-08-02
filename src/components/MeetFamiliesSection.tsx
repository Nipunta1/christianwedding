import React, { useState } from 'react';
import { Users, Heart, Eye } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  photo?: string;
}

const MeetFamiliesSection: React.FC = () => {
  const [showBridePetals, setShowBridePetals] = useState(false);
  const [showGroomPetals, setShowGroomPetals] = useState(false);

  const brideFamily: FamilyMember[] = [
    {
      id: '1',
      name: 'Robert & Mary Johnson',
      relation: 'Parents',
      photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      relation: 'Sister & Maid of Honor',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'David Johnson',
      relation: 'Brother',
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      name: 'Grace Thompson',
      relation: 'Grandmother',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '5',
      name: 'James Johnson',
      relation: 'Uncle',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const groomFamily: FamilyMember[] = [
    {
      id: '1',
      name: 'William & Patricia Smith',
      relation: 'Parents',
      photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Christopher Smith',
      relation: 'Brother & Best Man',
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Jennifer Smith',
      relation: 'Sister',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      name: 'Margaret Smith',
      relation: 'Grandmother',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const handleViewBrideDetails = () => {
    setShowBridePetals(true);
    setTimeout(() => setShowBridePetals(false), 5000);
  };

  const handleViewGroomDetails = () => {
    setShowGroomPetals(true);
    setTimeout(() => setShowGroomPetals(false), 5000);
  };

  const FallingPetals: React.FC<{ show: boolean; color: string }> = ({ show, color }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9998 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 ${color} rounded-full animate-falling-petals opacity-70`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute w-2 h-2 text-pink-300 animate-falling-petals opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 2}s`
            }}
          >
            <Heart className="w-full h-full" fill="currentColor" />
          </div>
        ))}
      </div>
    );
  };

  const FamilyCard: React.FC<{
    title: string;
    members: FamilyMember[];
    onViewDetails: () => void;
    gradientFrom: string;
    gradientTo: string;
  }> = ({ title, members, onViewDetails, gradientFrom, gradientTo }) => (
    <div className="relative group">
      {/* Rotating Gradient Border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradientFrom} ${gradientTo} animate-golden-rotate opacity-75 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="absolute inset-0.5 bg-white rounded-2xl"></div>
      
      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-rose-50/95 via-pink-50/95 to-red-50/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300 rounded-2xl"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <Users className="w-6 h-6 text-rose-600 mr-3 animate-heartbeat" />
            <h4 className="text-2xl font-serif gradient-text animate-soft-glow">{title}</h4>
          </div>
          
          {/* Family Members List - Fixed Height with Scroll */}
          <div className="h-80 overflow-y-auto family-scroll pr-2 mb-6">
            <div className="space-y-4">
              {members.map((member, index) => (
                <div 
                  key={member.id}
                  className="flex items-center space-x-4 p-3 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 animate-staggeredFadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-200 shadow-md">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                          <Users className="w-6 h-6 text-rose-600" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h5 className="font-semibold text-gray-800 gradient-text-animated text-sm">{member.name}</h5>
                    <p className="text-xs text-rose-600 font-medium">{member.relation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* View Details Button */}
          <button
            onClick={onViewDetails}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-buttonPulse"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl animate-slideInUp group" style={{ animationDelay: '1.0s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/95 via-rose-50/95 to-red-100/95 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-rose-200/20 to-red-200/20 animate-gradientShift" style={{ animationDelay: '8s' }}></div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-8">
            <Heart className="w-6 h-6 text-pink-600 mr-3 animate-heartbeat" fill="currentColor" />
            <h3 className="text-3xl font-serif text-gray-800 gradient-text animate-soft-glow animate-bounce-text group-hover:text-pink-900 transition-colors duration-300" style={{ animationDelay: '1.2s' }}>Meet Our Families</h3>
          </div>
          
          {/* Family Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <FamilyCard
              title="Bride's Family"
              members={brideFamily}
              onViewDetails={handleViewBrideDetails}
              gradientFrom="from-pink-400"
              gradientTo="to-rose-600"
            />
            
            <FamilyCard
              title="Groom's Family"
              members={groomFamily}
              onViewDetails={handleViewGroomDetails}
              gradientFrom="from-blue-400"
              gradientTo="to-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Falling Petals Animations */}
      <FallingPetals show={showBridePetals} color="bg-pink-300" />
      <FallingPetals show={showGroomPetals} color="bg-blue-300" />
    </>
  );
};

export default MeetFamiliesSection;