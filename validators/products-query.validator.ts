import Joi from "joi";

export const productsQueryValidator = (query: any) => {
  const schema = Joi.object({
    page: Joi.number().integer().min(1).optional().default(1),
    limit: Joi.number().integer().min(1).max(50).optional().default(10),
  });
    return schema.validate(query);
    
};
