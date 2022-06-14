import { hashSync } from "bcrypt";
import db from "../config/db.js";

const findUserByEmail = async (email) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
  return rows[0];
};

const createUser = async (username, email, password, pictureUrl) => {
  await db.query(
    'INSERT INTO users (username, email, password, "pictureUrl") values ($1,$2,$3,$4)',
    [username, email, hashSync(password, 10), pictureUrl],
  );
};

const userRepository = {
  findUserByEmail,
  createUser,
};

export default userRepository;
