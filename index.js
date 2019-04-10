/*
 * NovaAssetsBundler.
 *
 * @package   NovaAssetsBundler
 *
 * @author    Novactive <f.alexandre@novactive.com>
 * @copyright 2019 Novactive
 * @license   https://github.com/Novactive/NovaAssetsBundler/blob/master/LICENSE
 */

const Bundler = require('./src/assetsbundler/Bundler')
const ConfigurationGenerator = require('./src/assetsbundler/ConfigurationGenerator')
const ImagesOptimisation = require('./src/assetsbundler/task/ImagesOptimisation')
const JavascriptTransform = require('./src/assetsbundler/task/JavascriptTransform')
const LessTransform = require('./src/assetsbundler/task/LessTransform')
const Move = require('./src/assetsbundler/task/Move')
const SassTransform = require('./src/assetsbundler/task/SassTransform')

module.exports = {
  Bundler: Bundler,
  ConfigurationGenerator: ConfigurationGenerator,
  Task: {
    ImagesOptimisation: ImagesOptimisation,
    JavascriptTransform: JavascriptTransform,
    LessTransform: LessTransform,
    Move: Move,
    SassTransform: SassTransform
  }
}
