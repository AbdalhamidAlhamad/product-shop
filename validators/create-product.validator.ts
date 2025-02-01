import Joi from "joi";

export const createProductValidator = (obj: any) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().optional(),
    quantity: Joi.number().integer().required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
  });
  return schema.validate(obj);
};
