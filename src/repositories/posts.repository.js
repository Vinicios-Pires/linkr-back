import db from "./../config/db.js";

const createPost = async (url, description, userId) => {
  await db.query(`INSERT INTO posts (url, description, "userId") VALUES ($1, $2, $3)`, [
    url,
    description,
    userId,
  ]);
};

const getPosts = async () => {
  return db.query(
    `SELECT url, description FROM posts ORDER BY "createdAt" DESC LIMIT 20;`,
  );
};

const postsRepository = {
  createPost,
  getPosts,
};

export default postsRepository;
