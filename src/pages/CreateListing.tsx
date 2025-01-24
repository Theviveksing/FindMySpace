import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Plus, X } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface CreateListingProps {
  language: Language;
}

interface ImageFile {
  url: string;
  file: File;
}

const CreateListing = ({ language }: CreateListingProps) => {
  const navigate = useNavigate();
  const t = translations[language];
  const [amenities, setAmenities] = useState({
    wifi: false,
    gym: false,
    food: false,
    laundry: false,
    parking: false,
    security: false
  });
  const [images, setImages] = useState<ImageFile[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    totalRooms: '',
    rentPerMonth: '',
    description: ''
  });

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the listing object
    const listing = {
      ...formData,
      amenities,
      images: images.map(img => img.url), // In a real app, you'd upload these to a server
      id: Date.now(), // In a real app, this would come from the backend
      rating: 0,
      occupancy: '0%',
      availableRooms: parseInt(formData.totalRooms)
    };

    // In a real app, you'd make an API call here
    // For now, we'll store in localStorage
    const existingListings = JSON.parse(localStorage.getItem('ownerListings') || '[]');
    localStorage.setItem('ownerListings', JSON.stringify([...existingListings, listing]));

    navigate('/owner/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">{t.createListing}</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">{t.basicInfo}</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.propertyName}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.location}
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.totalRooms}
                  </label>
                  <input
                    type="number"
                    name="totalRooms"
                    required
                    min="1"
                    value={formData.totalRooms}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.rentPerMonth}
                  </label>
                  <input
                    type="number"
                    name="rentPerMonth"
                    required
                    min="0"
                    value={formData.rentPerMonth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">{t.amenities}</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(amenities).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => setAmenities(prev => ({ ...prev, [key]: !prev[key] }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 capitalize">{key}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">{t.images}</h2>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">{t.dragAndDrop}</p>
                  </div>
                  <label className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                    {t.uploadFiles}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t.description}
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/owner/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t.createListing}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateListing;