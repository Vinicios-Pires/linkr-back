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

const userRepository = {
  findUsersByUsername,
  findUserByEmail,
  createUser,
};

export default userRepository;
