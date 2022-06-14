/* O middleware recebe um Joi Schema e realiza a validacao*/
const JoiValidation = (objectSchema) => {
  return (req, res, next) => {
    const { error } = objectSchema.validate(req.body, { abortEarly: false });
    if (error) res.status(422).send(error.details.map((detail) => detail.message));
    else next();
  };
};

export default JoiValidation;
