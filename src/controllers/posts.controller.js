import postsRepository from "../repositories/posts.repository.js";

const createPost = async (req, res) => {
  const { url, description } = req.body;
  const { id } = res.locals.userData;

  console.log(res.locals.userData)

  try {
    await postsRepository.createPost(url, description, id);
    res.sendStatus(201); // created
  } catch (err) {
    console.dir(err);
    return res.sendStatus(500); // server error
  }
};

const getPosts = async (req, res) => {
  try {
    const { rows: posts } = await postsRepository.getPosts();
    res.status(200).send(posts); // sucess && send posts to front
  } catch (err) {
    console.log(err);
    return res.sendStatus(500); // server error
  }
};

const postsController = {
  createPost,
  getPosts,
};

export default postsController;
