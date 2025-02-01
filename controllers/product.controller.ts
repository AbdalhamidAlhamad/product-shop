import expressAsyncHandler from "express-async-handler";
import {
  createProductValidator,
  productsQueryValidator,
  UpdateProductValidator,
} from "./../validators";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

import { ProductService } from "../services/product.service";
import { ProductResponseDto } from "../dtos/response";

export const createProductCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = createProductValidator(req.body);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const product = await ProductService.createProduct(req.body);

    res.status(201).json(new ProductResponseDto(product));
  }
);

export const getProductsCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = productsQueryValidator(req.query);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const [products, count] = await ProductService.getProducts({ page, limit });

    res.status(200).json({
      data: products.map((product) => new ProductResponseDto(product)),
      total: count,
      page,
      size: limit,
      totalPages: Math.ceil(count / limit),
    });
  }
);

export const getProductByIdCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await ProductService.getProductById(req.params.id);

    res.status(200).json(new ProductResponseDto(product));
  }
);

export const updateProductCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = UpdateProductValidator(req.body);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const product = await ProductService.updateProduct(req.params.id, req.body);

    res.status(200).json(new ProductResponseDto(product));
  }
);

export const deleteProductCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await ProductService.deleteProduct(req.params.id);

    res.status(204).json();
  }
);
