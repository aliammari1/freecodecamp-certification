const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Exercise Tracker API',
      version: '2.0.0',
      description: 'A full-stack exercise tracking API built with Node.js, Express, and MongoDB',
      contact: {
        name: 'Ali Ammari',
        email: 'ammari.ali.0001@gmail.com',
      },
    },
    servers: [
      {
        url: '/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./index.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
