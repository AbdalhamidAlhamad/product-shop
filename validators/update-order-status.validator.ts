import { OrderStatus } from "../enums"
import Joi from "joi"

export const updateOrderStatusValidator = (obj: any) => {
    const schema = Joi.object({
        status: Joi.string().valid(...Object.values(OrderStatus)).required()
    })
    return schema.validate(obj)
}