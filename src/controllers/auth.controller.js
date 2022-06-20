import userRepository from "../repositories/user.repository.js";
import JwtSign from "../utils/JWTSign.js";

const signUserUp = async (req, res) => {
  try {
    const { id, username, email, pictureUrl } = await userRepository.createUser(req.body);
    const token = JwtSign(id, username, email, pictureUrl);
    res.status(201).send({ token });
  } catch (err) {
    console.dir(err);
    res.status(500).send("Internal server error while signing user up");
  }
};

const signUserIn = async (_req, res) => {
  try {
    const { id, username, email, pictureUrl } = res.locals.user;
    const token = JwtSign(id, username, email, pictureUrl);
    res.status(200).send({ token });
  } catch (err) {
    console.dir(err);
    res.status(500).send("Internal server error while signing user in");
  }
};

const authController = {
  signUserUp,
  signUserIn,
};

export default authController;
