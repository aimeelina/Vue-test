const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  outputDir:'vueTest',
  publicPath:'./'
})

// vue.config.js
// module.exports = {
//   devServer: {
//     port: 8080
//   },
//   publicPath: '/hello/',
//   assetsDir: 'static'
// }
