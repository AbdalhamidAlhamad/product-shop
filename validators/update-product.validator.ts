import Joi from "joi";

export const UpdateProductValidator = (obj: any) => {
  const schema = Joi.object({
    name: Joi.string().max(255).optional(),
    description: Joi.string().optional(),
    quantity: Joi.number().integer().optional(),
    imageUrl: Joi.string().optional(),
    price: Joi.number().optional(),
  });
  return schema.validate(obj);
};
