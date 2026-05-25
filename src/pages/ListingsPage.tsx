import React, { useState, useEffect } from 'react';
import { Search, Wifi, Utensils, Star, X, Dumbbell, MapPin, Car, Trees, Music, Coffee, Bus, Filter, Bed, Bath, Lock, CheckCircle, Calendar, Users, Phone, User } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface ListingsPageProps {
  language: Language;
}

interface RoomDetails {
  wifiSpeed: string;
  bedsCount: number;
  bedType: 'single' | 'double';
  washroomType: 'attached' | 'common';
  cupboardsCount: number;
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
  roomDetails?: RoomDetails;
}

const mockListings: Listing[] = [
  {
    id: 1,
    name: "Shivalika Apartment",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rent: 9500,
    capacity: "2-4",
    amenities: ["wifi", "food", "laundry", "gym"],
    rating: 4.5,
    location: "Near Parul University, Vadodara, Gujarat",
    description: "Modern student accommodation near Parul University with all essential amenities for comfortable living. Located in a peaceful neighborhood with easy access to campus and local attractions.",
    facilities: {
      gym: true,
      parking: true,
      laundry: true,
      wifi: true,
      food: true,
      security: true
    },
    nearby: {
      parks: ["Kamati Baug", "Sayaji Garden"],
      entertainment: ["Inox Multiplex", "Sports Complex"],
      cafes: ["Campus Cafe", "Chai Point"],
      transport: ["Vadodara Bus Station", "GSRTC Stand"]
    },
    roomDetails: {
      wifiSpeed: '50 Mbps',
      bedsCount: 2,
      bedType: 'single',
      washroomType: 'attached',
      cupboardsCount: 2
    }
  },
  {
    id: 2,
    name: "Maple Apartment",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rent: 12500,
    capacity: "1-2",
    amenities: ["wifi", "gym", "food"],
    rating: 4.8,
    location: "5 km from Parul University, Vadodara",
    description: "Premium student housing with modern amenities and beautiful interiors. Perfect for students who value comfort and convenience, just 5 km from Parul University.",
    facilities: {
      gym: true,
      parking: true,
      laundry: true,
      wifi: true,
      food: true,
      security: true
    },
    nearby: {
      parks: ["Ajwa Garden", "EME Temple Park"],
      entertainment: ["Student Center", "Gaming Zone"],
      cafes: ["Barista", "The Study Lounge"],
      transport: ["Parul University Shuttle", "City Bus Stop"]
    },
    roomDetails: {
      wifiSpeed: '100 Mbps',
      bedsCount: 1,
      bedType: 'double',
      washroomType: 'attached',
      cupboardsCount: 3
    }
  },
  {
    id: 3,
    name: "Murlidhar Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    rent: 15000,
    capacity: "1-2",
    amenities: ["wifi", "gym", "food", "laundry", "parking"],
    rating: 4.9,
    location: "15 km from Parul University, Vadodara",
    description: "Luxury student living with spacious rooms, high-speed internet, and premium amenities. Ideal for students seeking a premium experience near Parul University, Vadodara.",
    facilities: {
      gym: true,
      parking: true,
      laundry: true,
      wifi: true,
      food: true,
      security: true
    },
    nearby: {
      parks: ["Laxmi Vilas Palace Garden", "Sayaji Baug"],
      entertainment: ["PVR Cinemas", "VR Mall"],
      cafes: ["Starbucks", "Third Wave Coffee"],
      transport: ["Vadodara Railway Station", "Metro Station"]
    },
    roomDetails: {
      wifiSpeed: '200 Mbps',
      bedsCount: 2,
      bedType: 'double',
      washroomType: 'attached',
      cupboardsCount: 4
    }
  }
];

interface BookingForm {
  checkIn: string;
  checkOut: string;
  sharingType: 'single' | 'double' | 'triple';
  name: string;
  phone: string;
}

const ListingsPage = ({ language }: ListingsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    checkIn: '',
    checkOut: '',
    sharingType: 'single',
    name: '',
    phone: ''
  });
  const t = translations[language];

  useEffect(() => {
    const checkPendingDetail = (list: Listing[]) => {
      const pendingDetail = localStorage.getItem('pendingListingDetail');
      if (pendingDetail) {
        const listingId = parseInt(pendingDetail, 10);
        const found = list.find(l => l.id === listingId);
        if (found) {
          setSelectedListing(found);
        }
        localStorage.removeItem('pendingListingDetail');
      }
    };

    // Load owner listings from localStorage
    try {
      const storedListings = localStorage.getItem('ownerListings');
      if (storedListings) {
        const ownerListingsRaw = JSON.parse(storedListings);
        const mappedOwnerListings: Listing[] = ownerListingsRaw.map((ol: any) => {
          // Amenities map to list of strings
          const activeAmenities = ol.amenities ? Object.keys(ol.amenities).filter(key => ol.amenities[key]) : [];
          
          return {
            id: ol.id || Date.now() + Math.random(),
            name: ol.name || "Custom Student Space",
            image: ol.images && ol.images.length > 0 ? ol.images[0] : (ol.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"),
            rent: parseFloat(ol.rentPerMonth) || 10000,
            capacity: "1-2",
            amenities: activeAmenities,
            rating: ol.rating || 4.2,
            location: ol.location || "Near Parul University, Vadodara",
            description: ol.description || "A lovely student housing space near Parul University.",
            facilities: {
              gym: ol.amenities?.gym || false,
              parking: ol.amenities?.parking || false,
              laundry: ol.amenities?.laundry || false,
              wifi: ol.amenities?.wifi || false,
              food: ol.amenities?.food || false,
              security: ol.amenities?.security || false
            },
            nearby: {
              parks: ["Local Park", "Campus Green"],
              entertainment: ["Recreation Center", "Cinema Hall"],
              cafes: ["Coffee Shop", "Student Diner"],
              transport: ["Bus Station", "Metro Station"]
            },
            roomDetails: {
              wifiSpeed: '50 Mbps',
              bedsCount: 2,
              bedType: 'single' as const,
              washroomType: 'common' as const,
              cupboardsCount: 1
            }
          };
        });
        const allListings = [...mockListings, ...mappedOwnerListings];
        setListings(allListings);
        checkPendingDetail(allListings);
      } else {
        setListings(mockListings);
        checkPendingDetail(mockListings);
      }
    } catch (e) {
      console.error("Error loading owner listings:", e);
      setListings(mockListings);
      checkPendingDetail(mockListings);
    }

    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredListings = listings.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setSelectedListing(null);
    setBookingSubmitted(false);
    setBookingForm({ checkIn: '', checkOut: '', sharingType: 'single', name: '', phone: '' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin blur"></div>
            <div className="absolute inset-1 bg-white rounded-full"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping"></div>
          </div>
          <p className="text-gray-600 animate-pulse">Loading amazing spaces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12">
          <div className="absolute inset-0 bg-grid-white/10 mask-gradient"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
              Discover Your Perfect Space
            </h1>
            <p className="text-white/80 max-w-2xl animate-fade-in-delay-1">
              Browse through our curated collection of premium student accommodations,
              each carefully selected to provide the perfect blend of comfort and convenience.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="relative group animate-fade-in-delay-2">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {listing.name}
                    </h3>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-yellow-700">{listing.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {listing.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{t.currencySymbol}{listing.rent.toLocaleString('en-IN')}</span>
                      <span className="text-gray-600 text-sm">{t.perMonth}</span>
                    </div>
                    <button
                      onClick={() => setSelectedListing(listing)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                    >
                      {t.viewDetails}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Details Modal */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full animate-scale-in">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                  <h2 className="text-2xl font-bold">{selectedListing.name}</h2>
                  <button 
                    onClick={closeModal}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  {bookingSubmitted ? (
                    /* Booking Success View */
                    <div className="text-center py-8 animate-fade-in">
                      <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse opacity-30"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.bookingSuccess}</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">{t.bookingConfirmed}</p>
                      
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 max-w-md mx-auto mb-8 text-left">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          {t.bookingDetails}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm">{t.checkIn}</span>
                            <span className="font-medium text-gray-900">{bookingForm.checkIn}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm">{t.checkOut}</span>
                            <span className="font-medium text-gray-900">{bookingForm.checkOut}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm">{t.sharingType}</span>
                            <span className="font-medium text-gray-900">
                              {bookingForm.sharingType === 'single' ? t.singleSharing :
                               bookingForm.sharingType === 'double' ? t.doubleSharing : t.tripleSharing}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <span className="text-gray-600 text-sm">{t.yourName}</span>
                            <span className="font-medium text-gray-900">{bookingForm.name}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-600 text-sm">{t.phoneNumber}</span>
                            <span className="font-medium text-gray-900">{bookingForm.phone}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={closeModal}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 font-semibold"
                      >
                        {t.backToListings}
                      </button>
                    </div>
                  ) : (
                    /* Regular Details View */
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

                        {/* Room Details Card */}
                        {selectedListing.roomDetails && (
                          <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                              <Bed className="h-5 w-5 text-blue-600" />
                              {t.roomDetails}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                <Wifi className="h-5 w-5 text-blue-500" />
                                <div>
                                  <p className="text-xs text-gray-500">{t.wifiSpeed}</p>
                                  <p className="font-semibold text-gray-800">{selectedListing.roomDetails.wifiSpeed}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                <Bed className="h-5 w-5 text-purple-500" />
                                <div>
                                  <p className="text-xs text-gray-500">{t.beds}</p>
                                  <p className="font-semibold text-gray-800">{selectedListing.roomDetails.bedsCount} × {selectedListing.roomDetails.bedType === 'single' ? t.singleBed : t.doubleBed}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                <Bath className="h-5 w-5 text-teal-500" />
                                <div>
                                  <p className="text-xs text-gray-500">{t.washroomType}</p>
                                  <p className="font-semibold text-gray-800">{selectedListing.roomDetails.washroomType === 'attached' ? t.attachedWashroom : t.commonWashroom}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                                <Lock className="h-5 w-5 text-amber-500" />
                                <div>
                                  <p className="text-xs text-gray-500">{t.cupboards}</p>
                                  <p className="font-semibold text-gray-800">{selectedListing.roomDetails.cupboardsCount}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
                              <span className="text-3xl font-bold text-blue-600">{t.currencySymbol}{selectedListing.rent.toLocaleString('en-IN')}</span>
                              <span className="text-gray-600">{t.perMonth}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-5 w-5 text-yellow-400 fill-current" />
                              <span className="font-semibold">{selectedListing.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            {t.bookNow}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkIn}</label>
                              <input
                                type="date"
                                required
                                value={bookingForm.checkIn}
                                onChange={(e) => setBookingForm({...bookingForm, checkIn: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">{t.checkOut}</label>
                              <input
                                type="date"
                                required
                                value={bookingForm.checkOut}
                                onChange={(e) => setBookingForm({...bookingForm, checkOut: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <Users className="h-4 w-4 inline mr-1" />
                              {t.sharingType}
                            </label>
                            <select
                              value={bookingForm.sharingType}
                              onChange={(e) => setBookingForm({...bookingForm, sharingType: e.target.value as 'single' | 'double' | 'triple'})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              <option value="single">{t.singleSharing}</option>
                              <option value="double">{t.doubleSharing}</option>
                              <option value="triple">{t.tripleSharing}</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <User className="h-4 w-4 inline mr-1" />
                              {t.yourName}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Enter your full name"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              <Phone className="h-4 w-4 inline mr-1" />
                              {t.phoneNumber}
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 XXXXX XXXXX"
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] font-semibold"
                          >
                            {t.confirmBooking}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;