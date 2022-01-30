import { Joi } from "express-validation";

const postValidation = {
  body: Joi.object({
    title: Joi.string().required().min(3).max(50),
    body: Joi.string().required().min(3).max(400),
    owner: Joi.string().required(),
  }),
};

export default postValidation;
