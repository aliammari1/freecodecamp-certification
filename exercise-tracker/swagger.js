const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Exercise Tracker API",
      version: "2.0.0",
      description:
        "A full-stack exercise tracking API built with Express and MongoDB",
      license: { name: "MIT", url: "https://opensource.org/licenses/MIT" },
      contact: { name: "Ali Ammari", email: "ammari.ali.0001@gmail.com" },
    },
    servers: [{ url: "/", description: "Local server" }],
  },
  apis: ["./app.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
