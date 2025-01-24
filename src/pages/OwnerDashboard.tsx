import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Home, Star, Users, Edit, Trash2 } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface OwnerDashboardProps {
  language: Language;
}

interface Listing {
  id: number;
  name: string;
  image: string;
  occupancy: string;
  rating: number;
  totalRooms: number;
  availableRooms: number;
  location: string;
  rentPerMonth: string;
  description: string;
  amenities: Record<string, boolean>;
}

const OwnerDashboard = ({ language }: OwnerDashboardProps) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const t = translations[language];

  useEffect(() => {
    // Load listings from localStorage
    const storedListings = localStorage.getItem('ownerListings');
    if (storedListings) {
      setListings(JSON.parse(storedListings));
    }
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm(t.confirmDelete || 'Are you sure you want to delete this listing?')) {
      const updatedListings = listings.filter(listing => listing.id !== id);
      setListings(updatedListings);
      localStorage.setItem('ownerListings', JSON.stringify(updatedListings));
    }
  };

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingListing) return;

    const updatedListings = listings.map(listing =>
      listing.id === editingListing.id ? editingListing : listing
    );
    setListings(updatedListings);
    localStorage.setItem('ownerListings', JSON.stringify(updatedListings));
    setEditingListing(null);
  };

  const calculateStats = () => {
    const totalProperties = listings.length;
    const averageRating = listings.reduce((acc, curr) => acc + curr.rating, 0) / totalProperties || 0;
    const totalOccupancy = listings.reduce((acc, curr) => {
      const occupancy = parseInt(curr.occupancy) || 0;
      return acc + occupancy;
    }, 0) / totalProperties || 0;

    return {
      totalProperties,
      averageRating: averageRating.toFixed(2),
      totalOccupancy: `${totalOccupancy.toFixed(1)}%`
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{t.ownerDashboard}</h1>
          <Link
            to="/owner/create-listing"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>{t.createListing}</span>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalProperties}</p>
                <p className="text-2xl font-bold">{stats.totalProperties}</p>
              </div>
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.averageRating}</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold">{stats.averageRating}</p>
                  <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
                </div>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalOccupancy}</p>
                <p className="text-2xl font-bold">{stats.totalOccupancy}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t.yourProperties}</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {listings.map((listing) => (
              <div key={listing.id} className="p-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">{t.occupancy}</p>
                        <p className="font-semibold">{listing.occupancy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.rating}</p>
                        <div className="flex items-center">
                          <span className="font-semibold">{listing.rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.totalRooms}</p>
                        <p className="font-semibold">{listing.totalRooms}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.availableRooms}</p>
                        <p className="font-semibold">{listing.availableRooms}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEdit(listing)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(listing.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Modal */}
        {editingListing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">{t.editListing}</h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t.propertyName}
                    </label>
                    <input
                      type="text"
                      value={editingListing.name}
                      onChange={e => setEditingListing({...editingListing, name: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {t.location}
                    </label>
                    <input
                      type="text"
                      value={editingListing.location}
                      onChange={e => setEditingListing({...editingListing, location: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t.totalRooms}
                      </label>
                      <input
                        type="number"
                        value={editingListing.totalRooms}
                        onChange={e => setEditingListing({...editingListing, totalRooms: parseInt(e.target.value)})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {t.availableRooms}
                      </label>
                      <input
                        type="number"
                        value={editingListing.availableRooms}
                        onChange={e => setEditingListing({...editingListing, availableRooms: parseInt(e.target.value)})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setEditingListing(null)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;