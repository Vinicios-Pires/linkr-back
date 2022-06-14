import { compareSync } from "bcrypt";
import userRepository from "../repositories/user.repository.js";

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

const authMiddleware = {
  checkEmailAvailable,
  validateCredentials,
};

export default authMiddleware;
