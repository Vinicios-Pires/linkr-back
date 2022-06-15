import { compareSync } from "bcrypt";
import JWTVerify from "../utils/JWTVerify.js";
import dotenv from "dotenv";
dotenv.config();

import userRepository from "../repositories/user.repository.js";
import { bearerTokenSchema } from "../schemas/auth.schema.js";

const checkEmailAvailable = async (req, res, next) => {
  const emailAlreadyRegisted = await userRepository.findUserByEmail(req.body.email);
  if (emailAlreadyRegisted)
    res.status(409).send(`Email ${req.body.email} already registered`);
  else next();
};

const validateCredentials = async (req, res, next) => {
  const { email: reqEmail, password } = req.body;
  const user = await userRepository.findUserByEmail(reqEmail);

  if (!user || !compareSync(password, user.password)) {
    res.status(401).send("Invalid email or password");
  } else {
    const { username, email, pictureUrl } = user;

    res.locals.user = {
      username,
      email,
      pictureUrl,
    };
    next();
  }
};

const validateToken = (schema) => {
  return (bearerTokenSchema[schema] = (req, res, next) => {
    const { error } = schema.validate(req.headers, { abortEarly: false });
    if (error) {
      return res.sendStatus(401);
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const userData = JWTVerify(token);
      res.locals.userData = userData;
      next();
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
};

const authMiddleware = {
  checkEmailAvailable,
  validateCredentials,
  validateToken,
};

export default authMiddleware;
