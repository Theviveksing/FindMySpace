import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';
import { Language } from '../App';
import { translations } from '../translations';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FindMySpace</h3>
            <p className="text-gray-400">Your one-stop solution for finding the perfect student accommodation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/listings" className="hover:text-white">Find Space</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>support@findmyspace.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center space-x-2">
                <Instagram className="h-5 w-5" />
                <span>@findmyspace</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FindMySpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;