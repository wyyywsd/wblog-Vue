

module.exports = {
  
  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/public/articles': {
        target: 'http://localhost:8080',
        
      },
      '/public/user_profile': {
        target: 'http://localhost:8080',
        
      },
      
      // '/api': {
      //   target: 'http://192.168.50.200:8081',
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/api': ''
      //   // }
      // },
      // '/ajax': {
      //   target: 'https://m.maoyan.com',
      //   changeOrigin: true
      // }
    }
  }
}
