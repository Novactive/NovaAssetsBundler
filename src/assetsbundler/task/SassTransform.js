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

module.exports = class SassTransform extends Task {
  /**
   * @param {string} name
   * @param {string} entry
   */
  constructor (name, entry) {
    super()
    this.name = name
    this.entry = path.resolve(entry)
  }

  /**
   * @inheritDoc
   */
  configure (encore) {
    super.configure(encore)
    encore.addEntry(this.name, this.entry).enableSassLoader(
      () => {},
      {
        resolveUrlLoader: true
      }
    )
  }
}
