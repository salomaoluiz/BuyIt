module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          src: './src',
          '@components': './src/components',
          '@locales': './src/locales',
          '@routes': './src/routes',
          '@navigator': './src/navigator',
          '@styles': './src/styles',
          '@store': './src/store',
          '@utils': './src/utils',
          '@models': './src/models',
          '@lib': './src/lib',
          '@assets': './src/assets',
          '@errors': './src/errors',
        },
      },
    ],
  ],
};
