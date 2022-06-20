import postsRepository from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";
import linksRepository from "../repositories/links.repository.js";
import db from "../config/db.js";

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
    res.status(200).send(posts);
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

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const result = await postsRepository.getPostById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [post] = result.rows;
    if (post.userId !== user.id) {
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

const getMetadata = async (req, res) => {
  const postPromise = [];
  for (let i = 0; i < posts.length; i++) {
    try {
      const metadata = urlMetadata(posts[i].url);
      postPromise.push(metadata);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500).send("An error occured. Please,refresh the page");
    }
  }
  const postMetadata = await Promise.all(postPromise);
  const postData = [];
  for (let i = 0; i < postMetadata.length; i++) {
    postData.push({
      ...posts[i],
      postData: {
        postUrl: postMetadata[i].url,
        postImage: postMetadata[i].image,
        postTitle: postMetadata[i].title,
        postDescription: postMetadata[i].description,
      },
    });
  }
  return postData;
};

const postsController = {
  createPost,
  getPosts,
  getMetadata,

  deletePost,
  updatePost,
};

export default postsController;
