import React, { useEffect, useState } from 'react';
import { ArrowRight, Building2, Wifi, Shield, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Language } from '../App';
import { translations } from '../translations';

interface HomePageProps {
  language: Language;
}

const HomePage = ({ language }: HomePageProps) => {
  const t = translations[language];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Animated overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: '2px',
                height: '2px',
                background: 'white',
                opacity: 0.3,
                borderRadius: '50%'
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className={`space-y-8 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
          }`}>
            {/* Hero Title with gradient text */}
            <h1 className="text-5xl md:text-7xl font-bold animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              {t.heroTitle}
            </h1>

            {/* Subtitle with delayed animation */}
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-slide-up" 
               style={{ animationDelay: '0.3s' }}>
              {t.heroSubtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="glass-card rounded-full p-2 flex items-center transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex-grow flex items-center px-4">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <Link 
                  to="/listings"
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover-lift animate-glow flex items-center space-x-2 font-medium"
                >
                  <span>{t.startSearching}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Building2, number: '500+', text: 'Properties', delay: '0.9s' },
                { icon: Wifi, number: '100%', text: 'Coverage', delay: '1.1s' },
                { icon: Shield, number: '24/7', text: 'Security', delay: '1.3s' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="animate-slide-up"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="glass p-6 rounded-xl hover-lift">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-600/20">
                        <stat.icon className="h-8 w-8 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-3xl font-bold text-white">{stat.number}</div>
                        <div className="text-blue-200">{stat.text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Features Section with smooth reveal */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 animate-slide-up">{t.whyChooseUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Building2, title: t.verifiedProperties, desc: t.verifiedDesc },
              { icon: Wifi, title: t.modernAmenities, desc: t.amenitiesDesc },
              { icon: Shield, title: t.safeAndSecure, desc: t.safeDesc }
            ].map((feature, index) => (
              <div key={index} className="glass p-8 rounded-xl hover-lift animate-slide-up"
                   style={{ animationDelay: `${0.2 * index}s` }}>
                <feature.icon className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-shine opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold mb-6 animate-slide-up">{t.readyToFind}</h2>
          <p className="text-xl mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>{t.browseListings}</p>
          <Link 
            to="/listings"
            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-blue-600 hover-lift animate-glow font-medium"
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