import userRepository from "../repositories/user.repository.js";

const findUsersByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const users = await userRepository.findUsersByUsername(username);

    res.status(200).send(users);
  } catch (err) {
    console.dir(err);
    res.status(500).send("Internal server error while finding users");
  }
};

const userController = {
  findUsersByUsername,
};

export default userController;
