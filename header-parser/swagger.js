const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Header Parser API",
      version: "2.0.0",
      description: "An HTTP request header parser microservice API",
      license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },
      contact: { name: "Ali Ammari", email: "ammari.ali.0001@gmail.com" },
    },
    servers: [{ url: "/", description: "Local server" }],
  },
  apis: ["./app.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
