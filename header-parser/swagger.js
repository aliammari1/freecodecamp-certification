const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Header Parser API',
      version: '2.0.0',
      description: 'An HTTP request header parser microservice API',
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
