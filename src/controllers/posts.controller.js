import db from "../config/db.js";
import linksRepository from "../repositories/links.repository.js";
import postsRepository from "../repositories/posts.repository.js";
import likesRepository from "../repositories/likes.repository.js";

const createPost = async (req, res) => {
  const { url, description } = req.body;
  const { id: userId } = res.locals.userData;

  try {
    const { id: linkId } =
      (await linksRepository.getLinkByUrl(url)) ||
      (await linksRepository.createLink(url));

    await postsRepository.createPost(url, description, userId, linkId);
    res.sendStatus(201); // created
  } catch (err) {
    console.dir(err);
    return res.sendStatus(500); // server error
  }
};

const getPosts = async (_req, res) => {
  try {
    const { id: userId } = res.locals.userData;
    const { rows: posts } = await postsRepository.getPosts(userId);
    console.log(posts);
    if (posts.rowCount > 0) {
      return res.status(409).send("There are no posts yet");
    }
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send("An error occured while trying to fetch the posts, please refresh the page"); // server error
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userData } = res.locals;

  try {
    const result = await postsRepository.getPostById(id);
    if (!result) {
      return res.sendStatus(404);
    }

    if (result.userId !== userData.id) {
      return res.sendStatus(401);
    }

    await postsRepository.deletePost(id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updatePost = async (req, res) => {
  const post = req.body;
  const { id } = req.params;
  const { user } = res.locals;

  if (isNaN(parseInt(id))) {
    return res.sendStatus(400);
  }

  try {
    const result = await db.query(
      `
      SELECT * FROM posts WHERE url = $1 AND id != 2
      `,
      [post.url, id],
    );
    if (result.rowCount > 0) {
      return res.sendStatus(409); // conflict
    }

    await postsRepository.updatePost(post.url, post.description, user.id);

    res.sendStatus(200); // ok
  } catch (err) {
    console.log(err);
    res.sendStatus(500); // internal server error
  }
};

const handleLikeDislikePost = async (req, res) => {
  try {
    const { postId, likeAction } = req.params;
    const { id: userId } = res.locals.userData;

    if (likeAction === "like") {
      await likesRepository.createLike(postId, userId);
      return res.sendStatus(201);
    }

    await likesRepository.removeLike(postId, userId);
    return res.sendStatus(204);
  } catch (err) {
    console.dir(err);
    res.status(500).send("Error while liking post");
  }
};

const postsController = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  handleLikeDislikePost,
};

export default postsController;
