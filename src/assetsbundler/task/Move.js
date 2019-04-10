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

const path = require('path')
const Task = require('../Task')

module.exports = class Move extends Task {
  /**
   * @param {string} entry
   * @param {RegExp|null} pattern
   * @param {string} destDir
   */
  constructor (entry, pattern, destDir) {
    super()
    this.entry = path.resolve(entry)
    this.pattern = pattern
    this.destDir = destDir
  }

  /**
   * @inheritDoc
   */
  configure (encore) {
    super.configure(encore)
    const config = {
      from: this.entry,
      // to path is relative to the build directory
      to: `${this.destDir}/[path][name].[ext]`
    }
    if (this.pattern !== null) {
      config.pattern = this.pattern
    }
    encore.copyFiles(config)
  }
}
