import React from 'react';
import type { UserRole } from '../App';
import GoogleOneTap from '../components/GoogleOneTap';

interface SignInProps {
  setUserRole: (role: UserRole) => void;
}

const SignIn = ({ setUserRole }: SignInProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl space-y-8 border border-white/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">
              Sign in to continue to FindMySpace
            </p>
          </div>

          <div className="space-y-6">
            <GoogleOneTap setUserRole={setUserRole} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium"
              >
                Sign In
              </button>
            </form>

            <div className="text-center text-sm">
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;