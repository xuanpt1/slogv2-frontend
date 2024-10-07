const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/_variable.scss";` //引入全局变量
      }
    }
  },
  devServer: {
    client:{
      overlay: false,
    },
    port:8088,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:8080',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  },
  lintOnSave:false
})



