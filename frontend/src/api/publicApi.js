import axios from 'axios';

// Oryno Webapp Public API Base URL
const WEBAPP_API_BASE = 'https://modernstack-2.preview.emergentagent.com/api';

// Webapp Auth URLs for redirects
export const WEBAPP_URLS = {
  login: 'https://modernstack-2.preview.emergentagent.com/login',
  register: 'https://modernstack-2.preview.emergentagent.com/register',
  base: 'https://modernstack-2.preview.emergentagent.com'
};

// Create axios instance for public API
const publicApi = axios.create({
  baseURL: WEBAPP_API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// API Functions
export const fetchServices = async () => {
  try {
    const response = await publicApi.get('/public/services');
    return response.data.services || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const fetchStats = async () => {
  try {
    const response = await publicApi.get('/public/stats');
    return response.data || {};
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
};

export const fetchFeaturedHotels = async () => {
  try {
    const response = await publicApi.get('/public/featured-hotels');
    return response.data.hotels || [];
  } catch (error) {
    console.error('Error fetching featured hotels:', error);
    return [];
  }
};

export const fetchFeaturedPackages = async () => {
  try {
    const response = await publicApi.get('/public/featured-packages');
    return response.data.packages || [];
  } catch (error) {
    console.error('Error fetching featured packages:', error);
    return [];
  }
};

export const fetchPopularRoutes = async () => {
  try {
    const response = await publicApi.get('/public/popular-routes');
    return response.data.routes || [];
  } catch (error) {
    console.error('Error fetching popular routes:', error);
    return [];
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await publicApi.get('/public/testimonials');
    return response.data.testimonials || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
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
      services: [],
      stats: {},
      hotels: [],
      packages: [],
      routes: [],
      testimonials: []
    };
  }
};

export default publicApi;
