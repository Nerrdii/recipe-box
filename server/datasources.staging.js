'use strict';

module.exports = {
  mongoDS: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    database: 'recipe-manager',
    password: process.env.DB_PASSWORD,
    name: 'mongoDS',
    user: process.env.DB_USER,
    connector: 'mongodb',
  },
};
