const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use('/', createProxyMiddleware({ target: 'https://api.blockprint.sigp.io', changeOrigin: true }));
app.use('/api/v1', createProxyMiddleware({ target: 'https://beaconcha.in', changeOrigin: true }));
app.listen(4000);