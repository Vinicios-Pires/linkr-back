import db from "./../config/db.js";

const createPost = async (url, description, userId, linkId) => {
  await db.query(
    `INSERT INTO posts (url, description, "userId", "linkId") VALUES ($1, $2, $3, $4)`,
    [url, description, userId, linkId],
  );
};

const getPosts = async () => {
  return db.query(
    `SELECT  p.description, u."pictureUrl", u.username, 
    json_build_object(
      'title', l.title,
      'image', l.image,
      'description', l.description,
      'url', l.url
    ) as "linkData"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN links l ON l.id = p."linkId"
    ORDER BY p."createdAt" DESC LIMIT 20;`,
  );
};

const getPostById = async (id) => {
  return db.query("SELECT * FROM posts WHERE id = $1", [id]);
};

const deletePost = async (id) => {
  return db.query("DELETE FROM posts WHERE id = $1", [id]);
};

const updatePost = async (url, description, userId) => {
  return db.query(
    `
  UPDATE posts
  SET
    url = $1,
    description = $2
  WHERE "userId" = $3`,
    [url, description, userId],
  );
};

const postsRepository = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
};

export default postsRepository;
