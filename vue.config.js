const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete('svg')

    config.module
      .rule('fonts')
      .test(/\.(woff|woff2|eot|ttf|otf)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        // Modify options if needed (e.g., set output path)
        return {
          ...options,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      })
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader'
        }
      ]
    }
  }
})
