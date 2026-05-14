const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'URL Shortener API',
    description: 'A URL shortening microservice API',
    version: '2.0.0',
    contact: {
      name: 'Ali Ammari',
      email: 'ammari.ali.0001@gmail.com',
    },
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
