const webpack = require('webpack')
const path = require('path')

const isDev = process.env.NODE_ENV == 'development'

module.exports = {
  webpack: function (config, env) {
    config.module.rules[2].oneOf.forEach(rule => {
      if (rule.test) {
        const tests = Array.isArray(rule.test) ? rule.test : [rule.test]
        if (tests.some(t => t.test('.tsx'))) {
          rule.options.plugins.push('@babel/plugin-proposal-optional-chaining')
        }
      }
    })

    if (isDev) {
      // react-hot-loaderを有効にするために `react-dom` を拡張したパッケージに置き換え
      config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
    }

    return config
  }
}
