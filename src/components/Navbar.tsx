import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, User, LogOut, Plus } from 'lucide-react';
import type { UserRole } from '../App';

interface NavbarProps {
  userRole: UserRole;
  onSignOut: () => Promise<void>;
}

const Navbar = ({ userRole, onSignOut }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

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
                  <span>Dashboard</span>
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
                  <span>Create Listing</span>
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
                <span>Find Space</span>
              </Link>
            )}
            
            {userRole ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link 
                to="/signin" 
                className="flex items-center space-x-1 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;