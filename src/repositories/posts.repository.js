import db from "./../config/db.js";
import likesRepository from "./likes.repository.js";

const createPost = async (url, description, userId, linkId) => {
  await db.query(
    `INSERT INTO posts (url, description, "userId", "linkId") VALUES ($1, $2, $3, $4)`,
    [url, description, userId, linkId],
  );
};

const getPosts = async (userId) => {
  return db.query(
    `SELECT p.id, p.description, post_author."pictureUrl", post_author.username, post_author.id as "authorId",
    json_build_object(
      'title', links.title,
      'image', links.image,
      'description', links.description,
      'url', links.url
    ) as "linkData",
    array_remove(ARRAY[user_who_liked.username], NULL) as "likes" ,
    EXISTS (SELECT 1 FROM likes WHERE likes."postId" = p.id AND likes."userId" = $1) as "userHasLiked"
    FROM posts p
    JOIN users post_author ON post_author.id = p."userId"
    JOIN links ON links.id = p."linkId"
    LEFT JOIN likes ON likes."postId" = p.id
    LEFT JOIN users user_who_liked ON likes."userId" = user_who_liked.id 
    ORDER BY p."createdAt" DESC LIMIT 20;`,
    [userId],
  );
};

const getPostById = async (id) => {
  const { rows } = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  return rows[0];
};

const deletePost = async (id) => {
  await likesRepository.deleteLikesFromPost(id);
  return db.query("DELETE FROM posts WHERE id = $1;", [id]);
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
