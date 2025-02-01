import express from "express";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middlewares/error";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import xss from "xss-clean";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { notFound } from "./middlewares/not-found";
import { imageRouter, productRouter } from "./routes";
import path from "path";

dotenv.config();

const app = express();


// cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(xss());

app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/products", productRouter);

app.use("/api/images", imageRouter );

app.use(notFound);

app.use(ErrorMiddleware);

export default app;
