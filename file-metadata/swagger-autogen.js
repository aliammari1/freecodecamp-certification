const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'File Metadata API',
    description: 'A file metadata microservice API built with Node.js and Express',
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
