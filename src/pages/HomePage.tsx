import type { UserRole, Language } from '../App';
import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import TestimonialsSection from '../components/TestimonialsSection';

interface HomePageProps {
  userRole: UserRole;
  language: Language;
}

const HomePage = ({ userRole, language }: HomePageProps) => {
  return (
    <div className="flex flex-col">
      <HeroSection userRole={userRole} language={language} />
      <FeaturedListings language={language} />
      <TestimonialsSection language={language} />
    </div>
  );
};

export default HomePage;