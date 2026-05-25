import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, User, LogOut, Plus, Globe } from 'lucide-react';
import type { UserRole, Language } from '../App';
import { translations } from '../translations';

interface NavbarProps {
  userRole: UserRole;
  onSignOut: () => Promise<void>;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const Navbar = ({ userRole, onSignOut, language, setLanguage, theme, setTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];

  const handleSignOut = async () => {
    await onSignOut();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Home className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FindMySpace
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {userRole === 'owner' ? (
              <>
                <Link 
                  to="/owner/dashboard" 
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/owner/dashboard' 
                      ? 'bg-blue-50 text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>{t.dashboard}</span>
                </Link>
                <Link 
                  to="/owner/create-listing"
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === '/owner/create-listing'
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Plus className="h-5 w-5" />
                  <span>{t.createListing}</span>
                </Link>
              </>
            ) : (
              <Link 
                to="/listings"
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === '/listings'
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Search className="h-5 w-5" />
                <span>{t.findSpace}</span>
              </Link>
            )}

            {/* Theme Switcher */}
            <div className="flex items-center space-x-2 bg-gray-100/80 border border-gray-200 rounded-lg p-1.5 mr-2 shadow-inner">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 px-1">Theme</span>
              <div className="flex items-center space-x-1.5">
                {[
                  { id: 'blue', color: 'bg-blue-600', ring: 'ring-blue-400', label: 'Classic Blue' },
                  { id: 'emerald', color: 'bg-emerald-500', ring: 'ring-emerald-400', label: 'Forest Green' },
                  { id: 'sunset', color: 'bg-orange-500', ring: 'ring-orange-400', label: 'Sunset Glow' },
                  { id: 'cyberpunk', color: 'bg-pink-500', ring: 'ring-pink-400', label: 'Cyberpunk' },
                ].map((item) => (
                  <button
                    key={item.id}
                    title={item.label}
                    onClick={() => setTheme(item.id)}
                    className={`h-4 w-4 rounded-full ${item.color} transition-all duration-300 transform hover:scale-125 focus:outline-none ${
                      theme === item.id 
                        ? `ring-2 ring-offset-2 ${item.ring} scale-110 shadow-[0_0_8px_rgba(0,0,0,0.2)]` 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200 mr-2 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 flex items-center space-x-1 ${
                  language === 'en'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>EN</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 flex items-center space-x-1 ${
                  language === 'hi'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <span>हिन्दी</span>
              </button>
            </div>
            
            {userRole ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <LogOut className="h-5 w-5" />
                <span>{t.signOut}</span>
              </button>
            ) : (
              <Link 
                to="/signin" 
                className="flex items-center space-x-1 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <User className="h-5 w-5" />
                <span>{t.signIn}</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button with Toggle */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Mobile Theme Switcher */}
            <div className="flex items-center space-x-1.5 bg-gray-100 border border-gray-200 rounded-lg p-1.5">
              {['blue', 'emerald', 'sunset', 'cyberpunk'].map((tId) => {
                const colors: Record<string, string> = {
                  blue: 'bg-blue-600',
                  emerald: 'bg-emerald-500',
                  sunset: 'bg-orange-500',
                  cyberpunk: 'bg-pink-500',
                };
                return (
                  <button
                    key={tId}
                    onClick={() => setTheme(tId)}
                    className={`h-3.5 w-3.5 rounded-full ${colors[tId]} transition-all duration-200 focus:outline-none ${
                      theme === tId ? 'ring-1 ring-offset-1 ring-gray-400 scale-110 shadow-sm' : 'opacity-65'
                    }`}
                  />
                );
              })}
            </div>

            {/* Mobile Language Switcher */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200">
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-1 text-xs font-semibold text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              >
                <Globe className="h-3.5 w-3.5" />
                <span className="uppercase">{language}</span>
              </button>
            </div>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;