import React from 'react';
import type { UserRole } from '../App';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import TestimonialsSection from '../components/TestimonialsSection';

interface HomePageProps {
  userRole: UserRole;
}

const HomePage = ({ userRole }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <HeroSection userRole={userRole} />
      <FeaturedListings language="en" />
      <TestimonialsSection language="en" />
    </div>
  );
};

export default HomePage;