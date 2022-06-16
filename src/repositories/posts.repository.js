import db from "./../config/db.js";

const createPost = async (url, description, userId, linkId) => {
  await db.query(
    `INSERT INTO posts (url, description, "userId", "linkId") VALUES ($1, $2, $3, $4)`,
    [url, description, userId, linkId],
  );
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
