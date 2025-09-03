// Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:80',
  },
  production: {
    API_BASE_URL: 'https://your-production-api.com', // Update this for production
  },
  staging: {
    API_BASE_URL: 'https://your-staging-api.com', // Update this for staging
  }
};

// Get the current environment (default to development)
const environment = process.env.NODE_ENV || 'development';

// Export the config for the current environment
export default config[environment];
