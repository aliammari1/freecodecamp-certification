const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "File Metadata API",
      version: "2.0.0",
      description: "A file metadata microservice API built with Express",
      license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },
      contact: { name: "Ali Ammari", email: "ammari.ali.0001@gmail.com" },
    },
    servers: [{ url: "/", description: "Local server" }],
  },
  apis: ["./app.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
