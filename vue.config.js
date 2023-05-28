const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    allowedHosts: 'all',
    // https: true,
  },
  lintOnSave: false,
})
