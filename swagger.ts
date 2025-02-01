// src/swagger.ts
import { CreateProductRequestDto } from "./dtos/request";
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
  tags: [
    {
      name: "Products",
      description: "API for products in the system",
    },
    {
      name: "Images",
      description: "API for images in the system",
    },
  ],
  components: {
    schemas: {
      CreateProductRequest: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Name of the product",
            example: "Product 1",
          },
          description: {
            type: "string",
            description: "Description of the product",
            example: "This is a product",
          },
          quantity: {
            type: "integer",
            description: "Quantity of the product",
            example: 10,
          },
          price: {
            type: "number",
            description: "Price of the product",
            example: 100.0,
          },
          imageUrl: {
            type: "string",
            description: "Image URL of the product",
            example: "https://example.com/image.png",
          },
        },
      },
    },
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
