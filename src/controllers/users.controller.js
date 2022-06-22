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

const getPostsUser = async (req, res) => {
  const { id } = req.params;
  try {
    const postsUser = await userRepository.findPostsByUser(id);
    res.status(200).send(postsUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const userController = {
  findUsersByUsername,
  getPostsUser,
};

export default userController;
