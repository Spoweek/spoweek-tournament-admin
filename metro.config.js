const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for expo-router
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure expo-router works properly
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
