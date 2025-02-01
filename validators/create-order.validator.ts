import Joi from "joi";

export const createOrderValidator = (obj: any) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    customerName: Joi.string().required(),
    customerEmail: Joi.string().email().required(),
    customerPhone: Joi.string()
      .required()
      .regex(/^(?:\+962|0)7[789]\d{7}$/),
    shippingAddress: Joi.string().required(),
  });

    return schema.validate(obj);
};
