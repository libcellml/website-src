const path = require('path')

let defaults = {
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
}

module.exports.defaults = defaults
