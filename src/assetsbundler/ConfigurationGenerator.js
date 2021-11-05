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
   * @param {Array<string>} bundlerPaths
   * @param {Encore} encore
   * @return {Array}
   */
  getConfigs (bundlerPaths, encore) {
    const configs = []
    for (const bundlerPath of bundlerPaths) {
      configs.push(this.getBundlerConfig(bundlerPath, encore))
    }

    return configs
  }

  /**
   * @param {string} bundlerPath
   * @param {Encore} encore
   * @return {Object}
   */
  getBundlerConfig (bundlerPath, encore) {
    const bundler = require(`${bundlerPath}`)
    return bundler.getConfig(encore)
  }
}
