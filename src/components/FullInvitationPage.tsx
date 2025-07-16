import React, { useState, useRef, useEffect } from 'react';
import { 
  Church, 
  Clock, 
  MapPin, 
  Shirt, 
  Plane, 
  Cross, 
  ArrowUp, 
  ArrowDown,
  Check,
  Heart,
  Navigation,
  Star,
  Utensils,
  Building,
  Camera,
  Mountain,
  Mail,
  Phone
} from 'lucide-react';
import PhotoCarousel from './PhotoCarousel';
import WishesSection from './WishesSection';
import LocalAttractions from './LocalAttractions';
import Confetti from './Confetti';

interface FullInvitationPageProps {
  onBack: () => void;
}

const FullInvitationPage: React.FC<FullInvitationPageProps> = ({ onBack }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [thankYouCardRef, setThankYouCardRef] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isTop = scrollTop < 50;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setIsAtTop(isTop);
      setIsAtBottom(isBottom);
    }
  };

  const scrollToggle = () => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      if (isAtTop) {
        // Scroll to bottom
        containerRef.current.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth'
        });
      } else {
        // Scroll to top
        containerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleAcceptInvitation = () => {
    setIsAccepted(true);
    
    // Wait a moment for the card to render, then trigger confetti
    setTimeout(() => {
      const thankYouCard = document.querySelector('[data-thank-you-card]') as HTMLElement;
      setThankYouCardRef(thankYouCard);
      setShowConfetti(true);
      
      // Hide confetti after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setThankYouCardRef(null);
      }, 5000);
    }, 100);
  };

  const openDirections = (venue: string) => {
    const encodedVenue = encodeURIComponent(venue);
    window.open(`https://www.google.com/maps/search/${encodedVenue}`, '_blank');
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen overflow-y-auto relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), 
                    linear-gradient(135deg, #1e293b 0%, #334155 25%, #7c2d12 50%, #92400e 75%, #a16207 100%)`,
      }}
    >
      {/* Show confetti when invitation is accepted */}
      {showConfetti && <Confetti originElement={thankYouCardRef} />}

      {/* Enhanced Church Interior Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Stained Glass Window Effects */}
        <div className="absolute top-10 left-10 w-32 h-48 bg-gradient-to-b from-blue-400/20 via-purple-400/20 to-red-400/20 rounded-t-full blur-xl animate-pulse"></div>
        <div className="absolute top-10 right-10 w-32 h-48 bg-gradient-to-b from-green-400/20 via-yellow-400/20 to-orange-400/20 rounded-t-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Floating Candlelight Glow */}
        <div className="absolute bottom-20 left-1/4 w-6 h-20 bg-gradient-to-t from-amber-400/50 to-transparent rounded-full blur-sm animate-candle-flicker"></div>
        <div className="absolute bottom-20 right-1/4 w-6 h-20 bg-gradient-to-t from-amber-400/50 to-transparent rounded-full blur-sm animate-candle-flicker" style={{ animationDelay: '0.8s' }}></div>
        
        {/* Rays of Light from Stained Glass */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-blue-300/30 via-transparent to-transparent rotate-12 animate-light-ray"></div>
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-yellow-300/30 via-transparent to-transparent -rotate-12 animate-light-ray" style={{ animationDelay: '1s' }}></div>
        
        {/* Sparkling Dust Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/70 rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Scroll Toggle Button */}
      <button
        onClick={scrollToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-500 hover:scale-110 group animate-buttonPulse"
        style={{ zIndex: 1000 }}
      >
        {isAtTop ? (
          <ArrowDown className="w-6 h-6 group-hover:animate-bounce" />
        ) : (
          <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
        )}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      <div className="relative py-8 px-4 z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section with Enhanced Animation */}
          <div className="text-center mb-12 animate-zoomIn">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Couple exchanging rings"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-lg">
                  <Heart className="w-6 h-6 text-amber-600 animate-heartbeat" fill="currentColor" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/30 to-rose-200/30 blur-2xl animate-pulse opacity-70"></div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-2xl gradient-text animate-blur-unblur">
              Celebrating a Blessed Union in Christ
            </h1>
            <p className="text-xl text-amber-200 font-light drop-shadow-lg animate-fadeInScale" style={{ animationDelay: '2.5s' }}>
              Sarah Elizabeth & Michael James
            </p>
          </div>

          {/* Enhanced Event Details Grid with Creative Text Animations */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ceremony Details with Bouncing Animation */}
            <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-bounceIn group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/95 via-indigo-50/95 to-purple-100/95 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 animate-gradientShift"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-300/30 to-transparent rounded-bl-full"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Church className="w-8 h-8 text-blue-700 mr-3 animate-wiggle" />
                  <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-bounce-text group-hover:text-blue-900 transition-colors duration-300" style={{ animationDelay: '0.3s' }}>Sacred Ceremony</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center animate-slideInLeft group-hover:text-blue-800 transition-colors duration-300" style={{ animationDelay: '0.5s' }}>
                    <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">St. Mary's Cathedral</span>
                  </div>
                  <div className="flex items-center animate-slideInLeft group-hover:text-blue-800 transition-colors duration-300" style={{ animationDelay: '0.7s' }}>
                    <Clock className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">11:00 AM</span>
                  </div>
                  <button
                    onClick={() => openDirections('St. Mary\'s Cathedral, 123 Faith Street, Downtown')}
                    className="mt-4 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-slideInFromBottom" style={{ animationDelay: '0.9s' }}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>View Location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Reception Details with Rotating Animation */}
            <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-rotateIn group" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/95 via-pink-50/95 to-red-100/95 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200/20 via-pink-200/20 to-red-200/20 animate-gradientShift" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-300/30 to-transparent rounded-bl-full"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-rose-700 mr-3 animate-heartbeat" fill="currentColor" />
                  <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-blur-unblur group-hover:text-rose-900 transition-colors duration-300" style={{ animationDelay: '0.5s' }}>Joyful Reception</h3>
                </div>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-center animate-slideInRight group-hover:text-rose-800 transition-colors duration-300" style={{ animationDelay: '0.7s' }}>
                    <MapPin className="w-5 h-5 mr-3 text-rose-600" />
                    <span className="font-medium">Grand Ballroom, Heritage Hotel</span>
                  </div>
                  <div className="flex items-center animate-slideInRight group-hover:text-rose-800 transition-colors duration-300" style={{ animationDelay: '0.9s' }}>
                    <Clock className="w-5 h-5 mr-3 text-rose-600" />
                    <span className="font-medium">6:00 PM - 11:00 PM</span>
                  </div>
                  <button
                    onClick={() => openDirections('Grand Ballroom, Heritage Hotel, 456 Celebration Ave, Uptown')}
                    className="mt-4 flex items-center space-x-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-slideInFromBottom" style={{ animationDelay: '1.1s' }}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>View Location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dress Code with Fade Scale Animation */}
            <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-fadeInScale group" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/95 via-teal-50/95 to-cyan-100/95 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-teal-200/20 to-cyan-200/20 animate-gradientShift" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-300/30 to-transparent rounded-bl-full"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Shirt className="w-8 h-8 text-emerald-700 mr-3 animate-float" />
                  <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-bounce-text group-hover:text-emerald-900 transition-colors duration-300" style={{ animationDelay: '0.6s' }}>Elegant Attire</h3>
                </div>
                <div className="text-gray-700">
                  <p className="font-medium text-lg mb-2 animate-slideInLeft group-hover:text-emerald-800 transition-colors duration-300" style={{ animationDelay: '0.8s' }}>Formal Attire</p>
                  <p className="text-sm text-gray-600 leading-relaxed italic animate-fadeInUp group-hover:text-emerald-700 transition-colors duration-300" style={{ animationDelay: '1s' }}>
                    Modest & respectful dress appreciated in this sacred celebration
                  </p>
                </div>
              </div>
            </div>

            {/* Transportation with Slide Bottom Animation */}
            <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-slideInFromBottom group" style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/95 via-yellow-50/95 to-orange-100/95 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-yellow-200/20 to-orange-200/20 animate-gradientShift" style={{ animationDelay: '3s' }}></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-300/30 to-transparent rounded-bl-full"></div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Plane className="w-8 h-8 text-amber-700 mr-3 animate-float" />
                  <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-blur-unblur group-hover:text-amber-900 transition-colors duration-300" style={{ animationDelay: '0.8s' }}>Travel Information</h3>
                </div>
                <div className="space-y-3 text-gray-700 text-sm">
                  <p className="animate-slideInLeft group-hover:text-amber-800 transition-colors duration-300 font-medium" style={{ animationDelay: '1s' }}><strong className="text-amber-700">Airport:</strong> <span className="italic">City International (15 mins)</span></p>
                  <p className="animate-slideInLeft group-hover:text-amber-800 transition-colors duration-300 font-medium" style={{ animationDelay: '1.2s' }}><strong className="text-amber-700">Train:</strong> <span className="italic">Central Station (10 mins)</span></p>
                  <p className="animate-slideInLeft group-hover:text-amber-800 transition-colors duration-300 font-medium" style={{ animationDelay: '1.4s' }}><strong className="text-amber-700">Parking:</strong> <span className="italic">Complimentary valet available</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bible Verse Card */}
          <div className="relative overflow-hidden rounded-2xl p-10 shadow-2xl border-2 border-amber-200 animate-zoomIn group" style={{ animationDelay: '0.8s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-50/95 via-white/95 to-amber-50/95 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-rose-100/30 to-amber-100/30 animate-gradientShift" style={{ animationDelay: '4s' }}></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
            
            <div className="text-center relative z-10">
              <Cross className="w-12 h-12 mx-auto mb-6 text-amber-700 animate-wiggle" />
              <h3 className="text-2xl font-serif text-gray-800 mb-4 gradient-text animate-bounce-text animate-text-glow group-hover:text-amber-900 transition-colors duration-300" style={{ animationDelay: '1s' }}>Sacred Promise</h3>
              <blockquote className="text-xl md:text-2xl font-serif text-gray-800 italic leading-relaxed mb-6 animate-blur-unblur animate-float group-hover:text-amber-800 transition-colors duration-300" style={{ animationDelay: '1.2s' }}>
                "Therefore what God has joined together, let no one separate."
              </blockquote>
              <cite className="text-amber-700 font-semibold text-lg animate-fadeInScale animate-heartbeat group-hover:text-amber-900 transition-colors duration-300" style={{ animationDelay: '3.5s' }}>— Mark 10:9</cite>
            </div>
          </div>

          {/* Local Attractions Section */}
          <LocalAttractions />

          {/* Photo Carousel */}
          <PhotoCarousel />

          {/* Enhanced Wishes Section */}
          <WishesSection />

          {/* Accept Invitation / Thank You Section */}
          {!isAccepted ? (
            <div className="text-center animate-smoothReveal" style={{ animationDelay: '1s' }}>
              <button
                onClick={handleAcceptInvitation}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group animate-buttonPulse"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Accept Invitation</span>
                  <Check className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
              </button>
            </div>
          ) : (
            <div 
              data-thank-you-card
              className="relative overflow-hidden rounded-2xl p-8 text-center shadow-2xl border-2 animate-smoothReveal animate-glow" 
              style={{ borderColor: '#8B4513' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/95 via-orange-50/95 to-yellow-50/95 backdrop-blur-sm"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 via-orange-100/30 to-yellow-100/30 animate-gradientShift"></div>
              
              <div className="relative z-10">
                <Check className="w-12 h-12 mx-auto mb-4 animate-heartbeat animate-bounce" style={{ color: '#8B4513' }} />
                <h3 className="text-2xl font-serif mb-3 font-bold animate-text-glow" style={{ color: '#8B4513' }}>Thank You, Dear Guest!</h3>
                <p className="text-lg leading-relaxed font-medium animate-fadeInScale" style={{ color: '#8B4513' }}>
                  Your presence will make our special day even more blessed.
                </p>
              </div>
            </div>
          )}

          {/* Contact Information Section */}
          <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl animate-fadeInUp group" style={{ animationDelay: '1.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100/95 via-gray-50/95 to-slate-100/95 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 via-gray-200/20 to-slate-200/20 animate-gradientShift" style={{ animationDelay: '6s' }}></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-2xl font-serif mb-6 animate-colorChange animate-bounce-text" style={{ animationDelay: '1.4s' }}>Contact Information</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center justify-center animate-slideInLeft group-hover:text-slate-800 transition-colors duration-300" style={{ animationDelay: '1.6s' }}>
                  <Mail className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium">For questions: <a href="mailto:sarahandmichael@wedding.com" className="text-amber-700 hover:text-amber-800 underline transition-colors duration-200">sarahandmichael@wedding.com</a></span>
                </div>
                <div className="flex items-center justify-center animate-slideInRight group-hover:text-slate-800 transition-colors duration-300" style={{ animationDelay: '1.8s' }}>
                  <Phone className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="font-medium">RSVP by May 15th: <a href="tel:+15551234567" className="text-amber-700 hover:text-amber-800 underline transition-colors duration-200">(555) 123-4567</a></span>
                </div>
                <p className="text-sm mt-4 font-cursive italic" style={{ color: '#8B4513', animationDelay: '2s' }}>
                  We look forward to celebrating this blessed day with you in Christ's love.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="text-center py-10 animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
            <p className="text-white/90 text-lg italic drop-shadow-lg leading-relaxed font-medium animate-float">
              "Love bears all things, believes all things, hopes all things, endures all things."
            </p>
            <p className="text-amber-200 text-sm mt-3 drop-shadow-lg font-semibold animate-pulse">— 1 Corinthians 13:7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullInvitationPage;