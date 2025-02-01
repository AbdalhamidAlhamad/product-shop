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
      name: "Orders",
      description: "API for orders in the system",
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

      CreateOrderRequest: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            description: "Product ID",
            example: "123e4567-e89b-12d3-a456-426614174000",
          },
          quantity: {
            type: "integer",
            description: "Quantity of the product",
            example: 10,
          },
          customerName: {
            type: "string",
            description: "Name of the customer",
            example: "John Doe",
          },
          customerEmail: {
            type: "string",
            description: "Email of the customer",
            example: "test@email.com",
          },
          customerPhone: {
            type: "string",
            description: "Phone number of the customer",
            example: "+962787259124",
          },
          shippingAddress: {
            type: "string",
            description: "Shipping address",
            example: "Amman, Jordan",
          },
        },
      },

      UpdateOrderStatusRequest: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description: "Status of the order",
            example: "PENDING",
          },
        },
      }
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
