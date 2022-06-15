import postsRepository from "../repositories/posts.repository.js";

const createPost = async (req, res) => {
  const { url, description } = req.body;
  const { id } = res.locals.userData;

  //TODO: precisa verificar se ja existe um link no bd com essa url,
  //Caso nao exista o link, adicionar um novo link ao bd
  //Pegar 'id' do link do bd pra poder criar um post

  try {
    await postsRepository.createPost(url, description, id);
    res.sendStatus(201); // created
  } catch (err) {
    console.dir(err);
    return res.sendStatus(500); // server error
  }
};

const getPosts = async (req, res) => {
  try {
    const { rows: posts } = await postsRepository.getPosts();
    res.status(200).send(posts); // sucess && send posts to front
    if (posts.rowCount > 0) {
      return res.status(409).send("There are no posts yet");
    }
  } catch (err) {
    console.log(err);
    return res
      .sendStatus(500)
      .send("An error occured while trying to fetch the posts, please refresh the page"); // server error
  }
};

const postsController = {
  createPost,
  getPosts,
};

export default postsController;
