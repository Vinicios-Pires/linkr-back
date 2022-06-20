import postsRepository from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";

const createPost = async (req, res) => {
  const { url, description } = req.body;
  const { id } = res.locals.userData;

  console.log(res.locals.userData)

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
    if(posts.rowCount > 0){
      return res.status(409).send("There are no posts yet")
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).send("An error occured while trying to fetch the posts, please refresh the page"); // server error
  }
};

const getMetadata = async (req,res) =>{
  const postPromise = [];
  for (let i = 0; i<posts.length; i++){
    try{
      const metadata = urlMetadata(posts[i].url);
      postPromise.push(metadata);
    } catch (err){
      console.log(err);
      return res.sendStatus(500).send("An error occured. Please,refresh the page")
    }
  }
  const postMetadata = await Promise.all(postPromise)
  const postData = [];
    for(let i = 0; i<postMetadata.length; i++){
        postData.push({...posts[i], postData:{
            postUrl: postMetadata[i].url,
            postImage: postMetadata[i].image,
            postTitle: postMetadata[i].title,
            postDescription: postMetadata[i].description
        }});
    }
    return postData;
}

const postsController = {
  createPost,
  getPosts,
  getMetadata,

};

export default postsController;
