// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  transformer: {
    ...getDefaultConfig(__dirname).transformer,
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  },
};
