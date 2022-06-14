import Joi from "joi";

export const SignUpSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  pictureUrl: Joi.string().uri().required(),
});

export const SignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
