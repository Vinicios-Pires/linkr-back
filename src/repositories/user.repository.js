import { hashSync } from "bcrypt";
import db from "../config/db.js";

const findUsersByUsername = async (partialUsername) => {
  const { rows } = await db.query(
    `SELECT username, "pictureUrl" FROM users
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
    `SELECT u.username, u."pictureUrl", p.description,
    json_build_object(
      'title', l.title,
      'image', l.image,
      'description', l.description,
      'url', l.url
    ) as "linkData"
    FROM posts p
    JOIN users u ON p."userId" = u.id
    JOIN links l ON p."linkId" = l.id
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
