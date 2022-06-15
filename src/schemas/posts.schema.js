import Joi from "joi";

export const PostSchema= Joi.object({
    description: Joi.string().required()
});

export const LinkSchema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required()
});