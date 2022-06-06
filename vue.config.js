module.exports = {
  devServer: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8089/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
