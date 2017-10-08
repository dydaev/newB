var Encore = require('@symfony/webpack-encore');

Encore
   .setOutputPath('web/build/')
   .setPublicPath('/build')
   .cleanupOutputBeforeBuild()
   .addStyleEntry('styles', './assets/App.sass')
   .addEntry('scripts', './assets/Main.js')
   .enableSassLoader()
   .enableReactPreset()
   .enableSourceMaps(!Encore.isProduction());

module.exports = Encore.getWebpackConfig();