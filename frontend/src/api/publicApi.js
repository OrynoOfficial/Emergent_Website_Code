import axios from 'axios';

// Oryno Webapp Public API Base URL
const WEBAPP_API_BASE = 'https://transport-hub-71.preview.emergentagent.com/api';

// Webapp Auth URLs for redirects
export const WEBAPP_URLS = {
  login: 'https://transport-hub-71.preview.emergentagent.com/login',
  register: 'https://transport-hub-71.preview.emergentagent.com/register',
  base: 'https://transport-hub-71.preview.emergentagent.com'
};

// Create axios instance for public API
const publicApi = axios.create({
  baseURL: WEBAPP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// FALLBACK DATA - Used when API is unavailable
// ============================================

const FALLBACK_SERVICES = [
  {
    id: '1',
    name: 'Bus Travel',
    description: 'Comfortable intercity bus services connecting major cities across Cameroon',
    icon: 'bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'
  },
  {
    id: '2',
    name: 'Hotels & Accommodation',
    description: 'Premium hotel bookings at competitive rates nationwide',
    icon: 'hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
  },
  {
    id: '3',
    name: 'Car Rental',
    description: 'Self-drive and chauffeur-driven vehicle rental services',
    icon: 'car',
    image: 'https://images.unsplash.com/photo-1449965408869-ebd3fee56940?w=800'
  },
  {
    id: '4',
    name: 'Package Delivery',
    description: 'Fast and reliable courier and logistics services',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800'
  },
  {
    id: '5',
    name: 'Restaurants',
    description: 'Discover and book the best dining experiences',
    icon: 'restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },
  {
    id: '6',
    name: 'Events & Banquets',
    description: 'Plan and book venues for your special occasions',
    icon: 'calendar',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'
  }
];

const FALLBACK_STATS = {
  totalBookings: '50,000+',
  activeUsers: '25,000+',
  citiesCovered: '8',
  partnerAgencies: '120+',
  customerSatisfaction: '98%',
  yearsOfService: '5+'
};

const FALLBACK_HOTELS = [
  {
    id: '1',
    name: 'Hilton Yaoundé',
    location: 'Yaoundé, Cameroon',
    rating: 4.8,
    price: 85000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa']
  },
  {
    id: '2',
    name: 'Sawa Hotel',
    location: 'Douala, Cameroon',
    rating: 4.6,
    price: 72000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center']
  },
  {
    id: '3',
    name: 'La Falaise Hotel',
    location: 'Douala, Cameroon',
    rating: 4.5,
    price: 65000,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    amenities: ['WiFi', 'Pool', 'Restaurant']
  },
  {
    id: '4',
    name: 'Djeuga Palace',
    location: 'Yaoundé, Cameroon',
    rating: 4.7,
    price: 78000,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant']
  }
];

const FALLBACK_PACKAGES = [
  {
    id: '1',
    name: 'Douala-Yaoundé Express',
    description: 'VIP bus travel with hotel accommodation',
    price: 45000,
    duration: '2 days',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    includes: ['VIP Bus Ticket', '1 Night Hotel', 'Breakfast']
  },
  {
    id: '2',
    name: 'Kribi Beach Getaway',
    description: 'Weekend escape to the beautiful beaches of Kribi',
    price: 120000,
    duration: '3 days',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    includes: ['Transport', '2 Nights Hotel', 'Meals', 'Beach Activities']
  },
  {
    id: '3',
    name: 'Business Traveler Package',
    description: 'Complete travel solution for business professionals',
    price: 85000,
    duration: '1 day',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
    includes: ['Airport Transfer', 'Hotel', 'WiFi', 'Meeting Room Access']
  },
  {
    id: '4',
    name: 'Northwest Adventure',
    description: 'Explore the scenic Northwest region',
    price: 150000,
    duration: '4 days',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    includes: ['Transport', '3 Nights Hotel', 'Guide', 'Meals']
  }
];

const FALLBACK_ROUTES = [
  {
    id: '1',
    from: 'Douala',
    to: 'Yaoundé',
    distance: '243 km',
    duration: '3h 30min',
    price: 5000,
    popularity: 95
  },
  {
    id: '2',
    from: 'Yaoundé',
    to: 'Douala',
    distance: '243 km',
    duration: '3h 30min',
    price: 5000,
    popularity: 92
  },
  {
    id: '3',
    from: 'Douala',
    to: 'Buea',
    distance: '70 km',
    duration: '1h 30min',
    price: 2500,
    popularity: 78
  },
  {
    id: '4',
    from: 'Yaoundé',
    to: 'Bafoussam',
    distance: '300 km',
    duration: '4h',
    price: 6000,
    popularity: 72
  },
  {
    id: '5',
    from: 'Douala',
    to: 'Kribi',
    distance: '150 km',
    duration: '2h 30min',
    price: 4000,
    popularity: 68
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: '1',
    name: 'Jean-Pierre Mbarga',
    location: 'Yaoundé',
    rating: 5,
    comment: 'Oryno has transformed how I travel for business. The booking process is seamless and the service is always reliable.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Marie-Claire Fotso',
    location: 'Douala',
    rating: 5,
    comment: 'I use Oryno for all my hotel bookings. Great prices and excellent customer service!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'Emmanuel Nkeng',
    location: 'Buea',
    rating: 4,
    comment: 'The package delivery service is fast and reliable. My parcels always arrive on time.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    date: '2024-01-05'
  },
  {
    id: '4',
    name: 'Sandrine Bella',
    location: 'Bafoussam',
    rating: 5,
    comment: 'Best travel platform in Cameroon! The app is easy to use and the prices are very competitive.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    date: '2023-12-28'
  }
];

// ============================================
// API Functions with Fallback Support
// ============================================

export const fetchServices = async () => {
  try {
    const response = await publicApi.get('/public/services');
    const data = response.data.services || [];
    return data.length > 0 ? data : FALLBACK_SERVICES;
  } catch (error) {
    console.warn('API unavailable, using fallback services data');
    return FALLBACK_SERVICES;
  }
};

export const fetchStats = async () => {
  try {
    const response = await publicApi.get('/public/stats');
    const data = response.data || {};
    return Object.keys(data).length > 0 ? data : FALLBACK_STATS;
  } catch (error) {
    console.warn('API unavailable, using fallback stats data');
    return FALLBACK_STATS;
  }
};

export const fetchFeaturedHotels = async () => {
  try {
    const response = await publicApi.get('/public/featured-hotels');
    const data = response.data.hotels || [];
    return data.length > 0 ? data : FALLBACK_HOTELS;
  } catch (error) {
    console.warn('API unavailable, using fallback hotels data');
    return FALLBACK_HOTELS;
  }
};

export const fetchFeaturedPackages = async () => {
  try {
    const response = await publicApi.get('/public/featured-packages');
    const data = response.data.packages || [];
    return data.length > 0 ? data : FALLBACK_PACKAGES;
  } catch (error) {
    console.warn('API unavailable, using fallback packages data');
    return FALLBACK_PACKAGES;
  }
};

export const fetchPopularRoutes = async () => {
  try {
    const response = await publicApi.get('/public/popular-routes');
    const data = response.data.routes || [];
    return data.length > 0 ? data : FALLBACK_ROUTES;
  } catch (error) {
    console.warn('API unavailable, using fallback routes data');
    return FALLBACK_ROUTES;
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await publicApi.get('/public/testimonials');
    const data = response.data.testimonials || [];
    return data.length > 0 ? data : FALLBACK_TESTIMONIALS;
  } catch (error) {
    console.warn('API unavailable, using fallback testimonials data');
    return FALLBACK_TESTIMONIALS;
  }
};

// Fetch all public data at once
export const fetchAllPublicData = async () => {
  try {
    const [services, stats, hotels, packages, routes, testimonials] = await Promise.all([
      fetchServices(),
      fetchStats(),
      fetchFeaturedHotels(),
      fetchFeaturedPackages(),
      fetchPopularRoutes(),
      fetchTestimonials()
    ]);
    
    return {
      services,
      stats,
      hotels,
      packages,
      routes,
      testimonials
    };
  } catch (error) {
    console.error('Error fetching all public data:', error);
    return {
      services: FALLBACK_SERVICES,
      stats: FALLBACK_STATS,
      hotels: FALLBACK_HOTELS,
      packages: FALLBACK_PACKAGES,
      routes: FALLBACK_ROUTES,
      testimonials: FALLBACK_TESTIMONIALS
    };
  }
};

// Export fallback data for direct use if needed
export const FALLBACK_DATA = {
  services: FALLBACK_SERVICES,
  stats: FALLBACK_STATS,
  hotels: FALLBACK_HOTELS,
  packages: FALLBACK_PACKAGES,
  routes: FALLBACK_ROUTES,
  testimonials: FALLBACK_TESTIMONIALS
};

export default publicApi;
