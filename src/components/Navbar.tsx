import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, User, Languages, LogOut, Plus } from 'lucide-react';
import { Language, UserRole } from '../App';
import { translations } from '../translations';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const Navbar = ({ language, setLanguage, userRole, setUserRole }: NavbarProps) => {
  const t = translations[language];
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleSignOut = () => {
    setUserRole(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FindMySpace</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {userRole === 'owner' ? (
              <>
                <Link to="/owner/dashboard" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <User className="h-5 w-5" />
                  <span>{t.dashboard}</span>
                </Link>
                <Link to="/owner/create-listing" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                  <Plus className="h-5 w-5" />
                  <span>{t.createListing}</span>
                </Link>
              </>
            ) : (
              <Link to="/listings" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                <Search className="h-5 w-5" />
                <span>{t.findSpace}</span>
              </Link>
            )}
            <button 
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-full border border-gray-300 hover:bg-gray-50"
            >
              <Languages className="h-5 w-5" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
            {userRole ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                <LogOut className="h-5 w-5" />
                <span>{t.signOut}</span>
              </button>
            ) : (
              <Link 
                to="/signin" 
                className="flex items-center space-x-1 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <User className="h-5 w-5" />
                <span>{t.signIn}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;