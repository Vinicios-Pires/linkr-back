import db from "./../config/db.js";

const createPost = async (url, description, userId) => {
  await db.query(
    `INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`,
    [url, description, userId],
  );
};

const getPosts = async () => {
  return db.query(`SELECT "postURL", description FROM posts ORDER BY id DESC LIMIT 10;`);
};

const postsRepository = {
  createPost,
  getPosts,
};

export default postsRepository;
