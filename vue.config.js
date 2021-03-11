module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.module
      .rule('wasm')
      .type('javascript/auto')
      .test(/\.wasm$/)
      .use('file-loader')
      .loader('file-loader')
      .end()
  }
}

