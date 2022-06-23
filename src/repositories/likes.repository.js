import db from "./../config/db.js";

const createLike = async (postId, userId) => {
  await db.query('INSERT INTO likes ("postId", "userId") VALUES ($1 ,$2);', [
    postId,
    userId,
  ]);
};

const removeLike = async (postId, userId) => {
  await db.query('DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;', [
    postId,
    userId,
  ]);
};

const likesRepository = {
  createLike,
  removeLike,
};

export default likesRepository;
