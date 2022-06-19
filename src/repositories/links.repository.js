import db from "./../config/db.js";
import getUrlMetadata from "../utils/getUrlMetadata.js";

const getLinkByUrl = async (url) => {
  const { rows } = await db.query("SELECT * from links WHERE url = $1;", [url]);
  return rows[0];
};

const createLink = async (url) => {
  const { title, image, description } = await getUrlMetadata(url);

  const { rows } = await db.query(
    "INSERT INTO links (title, image, description, url) VALUES ($1, $2, $3, $4) RETURNING id;",
    [title, image, description, url],
  );
  const { id } = rows[0];
  return { id };
};

const linksRepository = {
  getLinkByUrl,
  createLink,
};

export default linksRepository;
