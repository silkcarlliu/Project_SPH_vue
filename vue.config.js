const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //跨域配置
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
})
