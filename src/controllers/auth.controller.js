import userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";

const signUserUp = async (req, res) => {
  const { username, email, password, pictureUrl } = req.body;
  try {
    await userRepository.createUser(username, email, password, pictureUrl);
    res.sendStatus(201);
  } catch (err) {
    console.dir(err);
    res.status(500).send("Internal server error while signing user up");
  }
};

const signUserIn = async (_req, res) => {
  try {
    const { id, username, email, pictureUrl } = res.locals.user;
    const token = jwt.sign({ id, username, email, pictureUrl }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
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
