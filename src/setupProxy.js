const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(['/shopify', '/api', '/hello'], createProxyMiddleware({
        target: 'http://localhost:8000/',
        secure: false,
        changeOrigin: true
    }))

}
