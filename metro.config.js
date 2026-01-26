const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Agregamos glb y gltf a la lista de activos permitidos
config.resolver.assetExts.push('glb', 'gltf');

module.exports = config;