const path = require('path')
const set = require('lodash/set')
const fs = require('fs')
// const project = require('./project.config')
const pkg = require('./package.json')
// const { findPages } = require('./docs/src/modules/utils/find');
// const webpackConfig = require('./build/webpack.config')
// const inProject = path.resolve.bind(path, project.basePath)
const withTranspileModules = require('next-transpile-modules')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

process.env.LIB_VERSION = pkg.version

module.exports = (phase, { defaultConfig }) => {
  return withTranspileModules({
    distDir: phase !== 'production' ? '.next' : '../functions/next',
    // transpileModules: ['common'],
    webpack(config, options) {
      // console.log(config)
      // console.log(Object.keys( config))
      // config.resolve.symlinks = false
      // // config.module.rules[0].include.push(fs.realpathSync('../common'))
      // config.module.rules[0].include.push(path.resolve('./node_modules/common/'))
      // console.log(config.module.rules)
      // config.resolve.plugins.push(new TsconfigPathsPlugin({}))
      return config
    },
  })
}
