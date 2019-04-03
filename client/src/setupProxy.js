const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('proxy working');
  app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
};
