/*
 * NovaAssetsBundler.
 *
 * @package   NovaAssetsBundler
 *
 * @author    Novactive <f.alexandre@novactive.com>
 * @copyright 2019 Novactive
 * @license   https://github.com/Novactive/NovaAssetsBundler/blob/master/LICENSE
 */

'use strict'

const Encore = require('@symfony/webpack-encore')

module.exports = class ConfigurationGenerator {
  /**
   * @return {Array}
   */
  getConfigs (bundlerPaths) {
    const configs = []
    for (const bundlerPath of bundlerPaths) {
      configs.push(this.getBundlerConfig(bundlerPath))
    }

    return configs
  }

  /**
   * @param {string} bundlerPath
   * @return {Object}
   */
  getBundlerConfig (bundlerPath) {
    const bundler = require(`${bundlerPath}`)
    return bundler.getConfig(Encore)
  }
}
