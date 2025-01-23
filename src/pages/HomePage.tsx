import React from 'react';
import { ArrowRight, Building2, Wifi, Utensils, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../App';
import { translations } from '../translations';

interface HomePageProps {
  language: Language;
}

const HomePage = ({ language }: HomePageProps) => {
  const t = translations[language];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            {t.heroSubtitle}
          </p>
          <Link 
            to="/listings"
            className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {t.startSearching}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{t.whyChooseUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.verifiedProperties}</h3>
              <p className="text-gray-600">{t.verifiedDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Wifi className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.modernAmenities}</h3>
              <p className="text-gray-600">{t.amenitiesDesc}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.safeAndSecure}</h3>
              <p className="text-gray-600">{t.safeDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.readyToFind}</h2>
          <p className="text-xl mb-8">{t.browseListings}</p>
          <Link 
            to="/listings"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {t.viewListings}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;