import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { createOrderValidator, orderQueryValidator, updateOrderStatusValidator } from "../validators";
import ErrorHandler from "../utils/errorHandler";
import { OrderService } from "../services";
import { OrderResponseDto } from "../dtos/response";
import { OrdersFiltersRequestDto } from "dtos/request/orders-filters.request.dto";

export const createOrderCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = createOrderValidator(req.body);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const order = await OrderService.createOrder(req.body);

    res.status(201).json(new OrderResponseDto(order));
  }
);

export const getOrderByIdCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await OrderService.findOrderById(req.params.id);

    res.status(200).json(new OrderResponseDto(order));
  }
);

export const getOrdersCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { error } = orderQueryValidator(req.query);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const [orders, count] = await OrderService.findOrders(req.query as any);

    res.status(200).json({
      data: orders.map((order) => new OrderResponseDto(order)),
      total: count,
      page,
      size: limit,
      totalPages: Math.ceil(count / limit),
    });
  }
);

export const updateOrderStatusCtrl = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const  { error } = updateOrderStatusValidator(req.body);

    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }
    const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);

    res.status(200).json(new OrderResponseDto(order));
  }
);
