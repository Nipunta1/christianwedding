import React, { useState, useRef } from 'react';
import { MessageCircle, Send, User, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Wish } from '../types';

const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: '1',
      name: 'Emma Thompson',
      message: 'May your love story be filled with God\'s blessings and endless joy!',
      photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'David Wilson',
      message: 'Praying for a marriage rooted in faith and overflowing with love.',
      photo: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Grace Martinez',
      message: 'What a beautiful celebration of love and faith! God bless your union.',
      photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ]);
  
  const [newWish, setNewWish] = useState('');
  const [guestPhoto, setGuestPhoto] = useState<string | null>(null);
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultAvatar = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150';

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGuestPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setGuestPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.trim()) {
      const wish: Wish = {
        id: Date.now().toString(),
        name: 'Anonymous Guest',
        message: newWish.trim(),
        photo: guestPhoto || defaultAvatar
      };
      setWishes(prev => [wish, ...prev]);
      setNewWish('');
      setGuestPhoto(null);
      setCurrentWishIndex(0);
      setShowForm(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const nextWish = () => {
    setCurrentWishIndex((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setCurrentWishIndex((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-slideInUp group" style={{ animationDelay: '1.1s' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100/95 via-cyan-50/95 to-blue-100/95 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-200/20 via-cyan-200/20 to-blue-200/20 animate-gradientShift" style={{ animationDelay: '6s' }}></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer-background opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-active transition-opacity duration-300"></div>
      
      <div className="relative z-10 p-6">
        {/* Static Header */}
        <div className="flex items-center justify-center mb-6">
          <MessageCircle className="w-6 h-6 text-teal-600 mr-3 animate-heartbeat" />
          <h3 className="text-2xl font-serif text-gray-800 gradient-text animate-bounce-text group-hover:text-teal-900 transition-colors duration-300" style={{ animationDelay: '1.3s' }}>Your Blessed Wishes</h3>
        </div>

        {/* Add Wish Button */}
        {!showForm && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg animate-bounceIn" style={{ animationDelay: '1.5s' }}
            >
              Share Your Blessing
            </button>
          </div>
        )}

        {/* Wish Input Form */}
        {showForm && (
          <div className="mb-8 relative overflow-hidden rounded-xl p-6 border-2 border-teal-200 animate-slideInLeft">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50/90 to-cyan-50/90 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <form onSubmit={handleSubmitWish} className="space-y-6">
                {/* Photo Upload Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-teal-200 bg-gray-100 flex items-center justify-center shadow-lg">
                      {guestPhoto ? (
                        <img
                          src={guestPhoto}
                          alt="Guest photo"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-10 h-10 text-gray-400" />
                      )}
                    </div>
                    {guestPhoto && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-3 bg-white border-2 border-teal-200 rounded-lg px-6 py-3 hover:border-teal-400 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
                    >
                      <Camera className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700 font-medium">Add Photo</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG or PNG, max 5MB</p>
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="wishMessage" className="block text-sm font-medium text-gray-700 mb-3">
                    Your Blessing
                  </label>
                  <textarea
                    id="wishMessage"
                    value={newWish}
                    onChange={(e) => setNewWish(e.target.value)}
                    placeholder="Share your heartfelt wishes for the blessed couple..."
                    className="w-full p-4 border-2 border-teal-200 rounded-lg focus:border-teal-400 focus:outline-none resize-none h-32 font-light transition-all duration-200 shadow-sm focus:shadow-md text-base"
                    maxLength={200}
                    required
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {newWish.length}/200 characters
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="submit"
                    disabled={!newWish.trim()}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none text-lg"
                  >
                    <Send className="w-5 h-5" />
                    <span>Share Blessing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setNewWish('');
                      setGuestPhoto(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="px-8 py-4 border-2 border-teal-200 text-teal-700 rounded-lg hover:border-teal-400 hover:bg-teal-50 transition-all duration-200 font-medium text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Current Wish Display with Navigation */}
        {wishes.length > 0 && (
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-xl p-6 border-2 border-teal-200 animate-slideInRight">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-50/90 to-cyan-50/90 backdrop-blur-sm"></div>
              
              {/* Navigation Buttons */}
              {wishes.length > 1 && (
                <>
                  <button
                    onClick={prevWish}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-20"
                  >
                    <ChevronLeft className="w-5 h-5 text-teal-700" />
                  </button>
                  
                  <button
                    onClick={nextWish}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-20"
                  >
                    <ChevronRight className="w-5 h-5 text-teal-700" />
                  </button>
                </>
              )}
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={wishes[currentWishIndex].photo}
                      alt={wishes[currentWishIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-3 border-teal-200 shadow-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-3 text-xl">{wishes[currentWishIndex].name}</h4>
                    <p className="text-gray-700 italic leading-relaxed text-lg">
                      "{wishes[currentWishIndex].message}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {wishes.length} heartfelt {wishes.length === 1 ? 'blessing' : 'blessings'} shared
            {wishes.length > 1 && (
              <span className="ml-2 text-teal-600">
                ({currentWishIndex + 1} of {wishes.length})
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WishesSection;