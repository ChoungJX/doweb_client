const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/org',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://10.12.127.113:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/welcome_api',
        createProxyMiddleware({
            target: 'http://10.12.127.113:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/ssh',
        createProxyMiddleware({
            target: 'http://10.12.127.113:8888',
            changeOrigin: true,
        })
    );
    app.use(
        '/ssh/ws',
        createProxyMiddleware({
            target: 'http://10.12.127.113:8888',
            changeOrigin: true,
        })
    );
};

