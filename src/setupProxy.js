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
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/welcome_api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/version',
        createProxyMiddleware({
            target: 'http://127.0.0.1:4000',
            changeOrigin: true,
        })
    );
    app.use(
        '/ssh',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8888',
            changeOrigin: true,
        })
    );
    app.use(
        '/ssh/ws',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8888',
            changeOrigin: true,
        })
    );
};

