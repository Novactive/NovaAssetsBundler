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
const fs = require('fs')
const Task = require('./Task')

module.exports = class Bundler {
  /**
   * @param {string} identifier
   */
  constructor (identifier) {
    this.identifier = identifier
    this.tasks = []
    this.enableEslint = false
  }

  /**
   * @param {Task} task
   */
  addTask (task) {
    if (task instanceof Task) {
      this.tasks.push(task)
    }
  }

  /**
   * @param {Task} task
   */
  addRequiredTask (task) {
    if (task instanceof Task) {
      this.requiredTasks.push(task)
    }
  }

  /**
   * @return {Task[]}
   */
  getTasks () {
    return this.tasks
  }

  /**
   * @param {Encore} encore
   * @return {*}
   */
  getConfig (encore) {
    encore.reset()

    const publicPath = `/assets/themes/${this.identifier}`
    const outputDir = path.resolve(`./web/${publicPath}`)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    encore.setOutputPath(outputDir).setPublicPath(publicPath)

    const tasks = this.getTasks()
    for (const task of tasks) {
      task.configure(encore)
    }

    encore.enableSingleRuntimeChunk()
    encore.splitEntryChunks()
    encore.enableSourceMaps(!encore.isProduction())
    encore.configureTerserPlugin((options) => {
      options.terserOptions = {
        output: {
          comments: false
        }
      }
    })

    if (this.enableEslint === true) {
      encore.enableEslintLoader()
    }

    const config = encore.getWebpackConfig()
    config.name = this.identifier
    return config
  }
}
