import React from 'react';
import { Building2, GraduationCap } from 'lucide-react';

interface RoleSelectionModalProps {
  onSelect: (role: 'owner' | 'user') => void;
  onClose: () => void;
}

const RoleSelectionModal = ({ onSelect, onClose }: RoleSelectionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-center mb-6">Choose Your Account Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => onSelect('user')}
            className="w-full p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center space-x-4 group"
          >
            <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">Student</h3>
              <p className="text-gray-600">Looking for accommodation near your university</p>
            </div>
          </button>

          <button
            onClick={() => onSelect('owner')}
            className="w-full p-4 border rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center space-x-4 group"
          >
            <div className="p-3 rounded-full bg-blue-100 group-hover:bg-blue-200">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">Property Owner</h3>
              <p className="text-gray-600">Want to list and manage your properties</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;