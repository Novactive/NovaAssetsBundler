const Encore = require('@symfony/webpack-encore')
const glob = require('glob')
const path = require('path')
const getEzConfig = require('./ez.webpack.config.js')
const eZConfig = getEzConfig(Encore)
const ConfigurationGenerator = require('@novactive/assets-bundler/src/assetsbundler/ConfigurationGenerator')

const configGenerator = new ConfigurationGenerator();
let webpackConfigs = [eZConfig, ...configGenerator.getConfigs(glob.sync(
  path.resolve('./assets/*/*Bundler.js'),
  {}
))]

Encore.reset()
Encore.setOutputPath('web/assets/build')
  .setPublicPath('/assets/build')
  .enableSassLoader()
  .enableReactPreset()
  .enableSingleRuntimeChunk()

// Put your config here.

// uncomment the two lines below, if you added a new entry (by Encore.addEntry() or Encore.addStyleEntry() method) to your own Encore configuration for your project
// const projectConfig = Encore.getWebpackConfig();
// webpackConfigs.push(projectConfig)

// comment-out this line if you've uncommented the above lines
module.exports = webpackConfigs
