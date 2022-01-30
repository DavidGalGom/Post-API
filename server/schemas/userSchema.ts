import { Joi } from "express-validation";

const userValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{6,15}/),
    email: Joi.string().email().required(),
    isAdmin: Joi.boolean().optional(),
    posts: Joi.array().optional(),
  }),
};

export default userValidation;
