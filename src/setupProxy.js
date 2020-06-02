const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://docker.rabbitravel.xyz',
            changeOrigin: true,
        })
    );
    app.use(
        '/welcome_api',
        createProxyMiddleware({
            target: 'https://docker.rabbitravel.xyz',
            changeOrigin: true,
        })
    );
    app.use(
        '/version',
        createProxyMiddleware({
            target: 'https://docker.rabbitravel.xyz',
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

