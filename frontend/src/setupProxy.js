const { createProxyMiddleware } = require('http-proxy-middleware');

// CORS 문제 해결을 위한 Proxy 설정
module.exports = function (app) {
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://pro-api.coinmarketcap.com',
      changeOrigin: true,
    })
  );
};
