import React from 'react';
import { Star, MapPin } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface FeaturedListingsProps {
  language: Language;
}

const FeaturedListings = ({ language }: FeaturedListingsProps) => {
  const t = translations[language];

  const featuredListings = [
    {
      id: 1,
      title: 'Modern Student Apartment',
      location: 'Near Central University',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      price: 800,
      rating: 4.8,
      amenities: ['WiFi', 'Gym', 'Study Room']
    },
    {
      id: 2,
      title: 'Cozy Studio',
      location: '5 min from Campus',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      price: 650,
      rating: 4.5,
      amenities: ['WiFi', 'Laundry', 'Kitchen']
    },
    {
      id: 3,
      title: 'Luxury Student Housing',
      location: 'University District',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
      price: 1200,
      rating: 4.9,
      amenities: ['Pool', 'Gym', 'Study Room']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Student Spaces
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium student accommodations,
            all verified and ready for your next academic adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-md">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{listing.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {listing.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      ${listing.price}
                    </span>
                    <span className="text-gray-600 text-sm">/month</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;