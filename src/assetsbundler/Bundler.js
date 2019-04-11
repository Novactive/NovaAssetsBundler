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
    this.enableVersionning = true
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
  getConfigHook (encore) {

  }

  /**
   * @param {Encore} encore
   * @return {*}
   */
  getConfig (encore) {
    encore.reset()
    this.getConfigHook(encore)

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

    if (this.enableVersionning === true && encore.isProduction()) {
      encore.enableVersioning(true)
      encore.configureFilenames({
        js: '[name].[contenthash].js',
        css: '[name].[contenthash].css',
        images: 'images/[name].[ext]',
        fonts: 'fonts/[name].[ext]'
      })
    }

    encore.enableEslintLoader((options) => {
      options.failOnError = true
    })

    const config = encore.getWebpackConfig()
    config.name = this.identifier
    return config
  }
}
