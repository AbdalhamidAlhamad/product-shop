import { OrderStatus } from "../enums";
import Joi from "joi";

export const orderQueryValidator = (query: any) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).max(50).optional().default(10),
    customerName: Joi.string().optional(),
    customerEmail: Joi.string().email().optional(),
    customerPhone: Joi.string().optional(),
    orderDate: Joi.date().optional(),
    status: Joi.string().valid(...Object.values(OrderStatus)).optional()
});
  return schema.validate(query);
};
