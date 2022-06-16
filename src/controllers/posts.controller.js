import postsRepository from "../repositories/posts.repository.js";
import linksRepository from "../repositories/links.repository.js";

const createPost = async (req, res) => {
  const { url, description } = req.body;
  const { id: userId } = res.locals.userData;

  const { id: linkId } =
    (await linksRepository.getLinkByUrl(url)) || (await linksRepository.createLink(url));

  try {
    await postsRepository.createPost(url, description, userId, linkId);
    res.sendStatus(201); // created
  } catch (err) {
    console.dir(err);
    return res.sendStatus(500); // server error
  }
};

const getPosts = async (_req, res) => {
  try {
    const { rows: posts } = await postsRepository.getPosts();
    res.status(200).send(posts); // sucess && send posts to front
    if (posts.rowCount > 0) {
      return res.status(409).send("There are no posts yet");
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An error occured while trying to fetch the posts, please refresh the page"); // server error
  }
};

const postsController = {
  createPost,
  getPosts,
};

export default postsController;
