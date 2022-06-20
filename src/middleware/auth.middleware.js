import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import JWTVerify from "../utils/JWTVerify.js";
import "dotenv/config";

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
    const { id, username, email, pictureUrl } = user;

    res.locals.user = {
      id,
      username,
      email,
      pictureUrl,
    };
    next();
  }
};

const validateToken = (req, res, next) => {
  const { error } = bearerTokenSchema.validate(req.headers, { abortEarly: false });
  if (error)
    return res.status(401).send("Authorization: Bearer TOKEN header is required");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = JWTVerify(token);
    res.locals.userData = userData;
    next();
  } catch (err) {
    console.dir(err);
    res.status(401).send(err.message);
  }
};

const authMiddleware = {
  checkEmailAvailable,
  validateCredentials,
  validateToken,
};

export default authMiddleware;
