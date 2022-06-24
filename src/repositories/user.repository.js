import { hashSync } from "bcrypt";
import db from "../config/db.js";

const findUsersByUsername = async (partialUsername) => {
  const { rows } = await db.query(
    `SELECT id, username, "pictureUrl" FROM users
    WHERE username LIKE $1;`,
    [`${partialUsername}%`],
  );
  return rows;
};

const findUserByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
  return rows[0];
};

const createUser = async (userInfo) => {
  const { username, email, password, pictureUrl } = userInfo;
  const { rows } = await db.query(
    `INSERT INTO users (username, email, password, "pictureUrl") values ($1,$2,$3,$4) RETURNING *;`,
    [username, email, hashSync(password, 10), pictureUrl],
  );
  return rows[0];
};

const findPostsByUser = async (id) => {
  const { rows } = await db.query(
    `SELECT p.id, p.description, post_author."pictureUrl", post_author.username,
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
    WHERE p."userId" = $1
    ORDER BY p."createdAt" DESC LIMIT 20;`,
    [id],
  );

  return rows;
};

const userRepository = {
  findUsersByUsername,
  findUserByEmail,
  createUser,
  findPostsByUser,
};

export default userRepository;
