import db from "./../config/db.js";

const createPost = async (url, description, userId) => {
  await db.query(
    `INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`,
    [url, description, userId],
  );
};

const getPosts = async () => {
  return db.query(`SELECT "postURL", description FROM posts ORDER BY timestamp DESC LIMIT 20;`);
};

const getPostsById = async (id)=> {
  return db.query (`SELECT * FROM posts WHERE id = $1`,[id]);
}

const postsRepository = {
  createPost,
  getPosts,
  getPostsById
};

export default postsRepository;