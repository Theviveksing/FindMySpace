import React from 'react';
import { ArrowRight, Building2, GraduationCap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UserRole } from '../App';

interface HeroSectionProps {
  userRole: UserRole;
}

const HeroSection = ({ userRole }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-2xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in text-white">
              Find Your Perfect Student Space
            </h1>
            <p className="text-xl text-gray-100 animate-fade-in-delay-1">
              Discover comfortable and affordable accommodation options near your university.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              {userRole ? (
                <Link
                  to={userRole === 'owner' ? '/owner/dashboard' : '/listings'}
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  {userRole === 'owner' ? 'Go to Dashboard' : 'Find Space'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: Building2,
                title: 'Verified Properties',
                description: 'All our listings are verified to ensure you get quality accommodation.'
              },
              {
                icon: GraduationCap,
                title: 'Student Friendly',
                description: 'Spaces designed with students in mind, close to universities and amenities.'
              },
              {
                icon: Shield,
                title: 'Safe & Secure',
                description: 'Your safety is our priority. All properties meet security standards.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-md rounded-xl p-6 hover:bg-white transition-all duration-300 transform hover:scale-105 animate-fade-in-up shadow-lg"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="h-8 w-8 text-gray-900 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;