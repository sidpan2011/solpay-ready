import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure mini-css-extract-plugin is available for client-side builds
      const MiniCssExtractPlugin = require('mini-css-extract-plugin');
      
      // Check if the plugin is already added
      const hasMiniCssExtractPlugin = config.plugins.some(
        (plugin: any) => plugin.constructor.name === 'MiniCssExtractPlugin'
      );
      
      if (!hasMiniCssExtractPlugin) {
        config.plugins.push(new MiniCssExtractPlugin());
      }
    }
    
    return config;
  },
};

export default nextConfig;
