const enTranslations = {
  // Navbar
  findSpace: 'Find Space',
  signIn: 'Sign In',
  signOut: 'Sign Out',
  dashboard: 'Dashboard',
  createListing: 'Create Listing',
  
  // Homepage
  heroTitle: 'Find Your Perfect Student Space',
  heroSubtitle: 'Discover comfortable and affordable accommodation options near your university.',
  startSearching: 'Start Searching',
  getStarted: 'Get Started',
  whyChooseUs: 'Why Choose FindMySpace?',
  verifiedProperties: 'Verified Properties',
  verifiedDesc: 'All our listings are verified to ensure you get quality accommodation.',
  modernAmenities: 'Modern Amenities',
  amenitiesDesc: 'Find spaces with all the amenities you need for comfortable living.',
  safeAndSecure: 'Safe & Secure',
  safeDesc: 'Your safety is our priority. All properties meet security standards.',
  studentFriendly: 'Student Friendly',
  studentFriendlyDesc: 'Spaces designed with students in mind, close to universities and amenities.',
  readyToFind: 'Ready to Find Your Space?',
  browseListings: 'Browse through our curated list of student accommodations.',
  viewListings: 'View Listings',

  // Listings
  searchPlaceholder: 'Search by location, hostel name...',
  search: 'Search',
  person: 'Person',
  perMonth: '/month',
  viewDetails: 'View Details',
  facilities: 'Facilities',
  nearby: 'Nearby Places',
  gym: 'Fitness Center',
  parking: 'Parking Available',
  wifi: 'High-Speed WiFi',
  food: 'Food Service',
  parks: 'Parks & Recreation',
  entertainment: 'Entertainment',
  cafes: 'Cafes & Restaurants',
  transport: 'Transportation',
  bookNow: 'Book Now',

  // Sign In
  welcomeBack: 'Welcome Back',
  signInToContinue: 'Sign in to continue to FindMySpace',
  orContinueWith: 'Or continue with email',
  forgotPassword: 'Forgot your password?',
  email: 'Email Address',
  password: 'Password',
  accountType: 'Account Type',
  user: 'Student/User',
  owner: 'Property Owner',

  // Owner Dashboard
  ownerDashboard: 'Owner Dashboard',
  totalProperties: 'Total Properties',
  averageRating: 'Average Rating',
  totalOccupancy: 'Total Occupancy',
  yourProperties: 'Your Properties',
  occupancy: 'Occupancy',
  rating: 'Rating',
  totalRooms: 'Total Rooms',
  availableRooms: 'Available Rooms',
  editListing: 'Edit Listing',
  save: 'Save Changes',
  confirmDelete: 'Are you sure you want to delete this listing?',

  // Create Listing
  basicInfo: 'Basic Information',
  propertyName: 'Property Name',
  location: 'Location',
  rentPerMonth: 'Rent per Month',
  amenities: 'Amenities',
  images: 'Property Images',
  dragAndDrop: 'Drag and drop images here, or click to select files',
  uploadFiles: 'Upload Files',
  description: 'Property Description',
  cancel: 'Cancel',

  // Role Selection
  chooseAccountType: 'Choose Your Account Type',
  student: 'Student',
  studentDescription: 'Looking for accommodation near your university',
  propertyOwner: 'Property Owner',
  ownerDescription: 'Want to list and manage your properties'
} as const;

const hiTranslations = {
  // Hindi translations (using English as fallback for now)
  ...enTranslations
};

export const translations = {
  en: enTranslations,
  hi: hiTranslations
} as const;