import React, { useState } from 'react';
import { Search, Wifi, Utensils, Star, X, Dumbbell, MapPin, Car, Trees, Music, Coffee, Bus } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface ListingsPageProps {
  language: Language;
}

interface Listing {
  id: number;
  name: string;
  image: string;
  rent: number;
  capacity: string;
  amenities: string[];
  rating: number;
  location: string;
  description: string;
  facilities: {
    gym?: boolean;
    parking?: boolean;
    laundry?: boolean;
    wifi?: boolean;
    food?: boolean;
    security?: boolean;
  };
  nearby: {
    parks?: string[];
    entertainment?: string[];
    cafes?: string[];
    transport?: string[];
  };
}

const mockListings: Listing[] = [
  {
    id: 1,
    name: "Student Haven Hostel",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rent: 800,
    capacity: "2-4",
    amenities: ["wifi", "food", "laundry", "gym"],
    rating: 4.5,
    location: "Near Central University",
    description: "Modern student accommodation with all essential amenities for comfortable living. Located in a peaceful neighborhood with easy access to university and local attractions.",
    facilities: {
      gym: true,
      parking: true,
      laundry: true,
      wifi: true,
      food: true,
      security: true
    },
    nearby: {
      parks: ["Central Park", "University Gardens"],
      entertainment: ["Movie Theater", "Sports Complex"],
      cafes: ["Student Cafe", "Book & Brew"],
      transport: ["Bus Station", "Metro Station"]
    }
  },
  {
    id: 2,
    name: "Campus View Residency",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rent: 1000,
    capacity: "1-2",
    amenities: ["wifi", "gym", "food"],
    rating: 4.8,
    location: "5 min walk to University",
    description: "Premium student housing with modern amenities and stunning campus views. Perfect for students who value comfort and convenience.",
    facilities: {
      gym: true,
      parking: true,
      laundry: true,
      wifi: true,
      food: true,
      security: true
    },
    nearby: {
      parks: ["University Park", "Fitness Trail"],
      entertainment: ["Student Center", "Gaming Zone"],
      cafes: ["Campus Coffee", "Study Lounge"],
      transport: ["University Shuttle", "Bike Sharing Station"]
    }
  }
];

const ListingsPage = ({ language }: ListingsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const t = translations[language];

  const closeModal = () => setSelectedListing(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {t.search}
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockListings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{listing.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1">{listing.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{listing.location}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {listing.capacity} {t.person}
                  </span>
                  <div className="flex space-x-2">
                    {listing.amenities.includes('wifi') && (
                      <Wifi className="h-5 w-5 text-blue-600" />
                    )}
                    {listing.amenities.includes('food') && (
                      <Utensils className="h-5 w-5 text-blue-600" />
                    )}
                    {listing.amenities.includes('gym') && (
                      <Dumbbell className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${listing.rent}</span>
                    <span className="text-gray-600">{t.perMonth}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedListing(listing)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedListing.name}</h2>
                <button 
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedListing.image}
                      alt={selectedListing.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="h-5 w-5" />
                        <span>{selectedListing.location}</span>
                      </div>
                      <p className="text-gray-600">{selectedListing.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t.facilities}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedListing.facilities.gym && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Dumbbell className="h-5 w-5 text-blue-600" />
                            <span>{t.gym}</span>
                          </div>
                        )}
                        {selectedListing.facilities.parking && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Car className="h-5 w-5 text-blue-600" />
                            <span>{t.parking}</span>
                          </div>
                        )}
                        {selectedListing.facilities.wifi && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Wifi className="h-5 w-5 text-blue-600" />
                            <span>{t.wifi}</span>
                          </div>
                        )}
                        {selectedListing.facilities.food && (
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Utensils className="h-5 w-5 text-blue-600" />
                            <span>{t.food}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">{t.nearby}</h3>
                      <div className="space-y-4">
                        {selectedListing.nearby.parks && (
                          <div className="flex items-start space-x-2">
                            <Trees className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-medium">{t.parks}</h4>
                              <p className="text-gray-600">{selectedListing.nearby.parks.join(', ')}</p>
                            </div>
                          </div>
                        )}
                        {selectedListing.nearby.entertainment && (
                          <div className="flex items-start space-x-2">
                            <Music className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-medium">{t.entertainment}</h4>
                              <p className="text-gray-600">{selectedListing.nearby.entertainment.join(', ')}</p>
                            </div>
                          </div>
                        )}
                        {selectedListing.nearby.cafes && (
                          <div className="flex items-start space-x-2">
                            <Coffee className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-medium">{t.cafes}</h4>
                              <p className="text-gray-600">{selectedListing.nearby.cafes.join(', ')}</p>
                            </div>
                          </div>
                        )}
                        {selectedListing.nearby.transport && (
                          <div className="flex items-start space-x-2">
                            <Bus className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <h4 className="font-medium">{t.transport}</h4>
                              <p className="text-gray-600">{selectedListing.nearby.transport.join(', ')}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-3xl font-bold text-blue-600">${selectedListing.rent}</span>
                          <span className="text-gray-600">{t.perMonth}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="font-semibold">{selectedListing.rating}</span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                        {t.bookNow}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingsPage;