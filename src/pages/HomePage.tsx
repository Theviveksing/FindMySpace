import React from 'react';
import type { UserRole } from '../App';
import HeroSection from '../components/HeroSection';

interface HomePageProps {
  userRole: UserRole;
}

const HomePage = ({ userRole }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <HeroSection userRole={userRole} />
    </div>
  );
};

export default HomePage;