// src/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Product Shop API",
    version: "1.0.0",
    description: "A simple Express Product Shop API",
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
  tags: [],
  components: {
    schemas: {},
  },
  // ...
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.ts", "./dist/routes/*.js"], // Adjust to your routes' locations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
