import { trendingRepository } from "../repositories/trending.repository.js"

async function getTrendings(req, res) {
  const LIMIT_TRENDINGS = 10

  try {
    const { rows: trendings } = await trendingRepository.getTrendingHashtags(
      LIMIT_TRENDINGS,
    )

    res.send(trendings)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

const getHashtagPosts = async (req, res) => {
  const { hashtag } = req.params;

  try {
    const { id: userId } = res.locals.userData;
    console.log(userId)
    const { rows: postsUser } = await trendingRepository.getPostsByHash(userId, hashtag);
    if (postsUser.rowCount > 0) {
      return res.status(409).send("There are no posts yet");
    }
    res.status(200).send(postsUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const trendingController = {
  getTrendings,
  getHashtagPosts,
}

export default trendingController;

// export const getHashtagPosts = async (req, res) => {
//   const { hashtag } = req.params;
//   try {
//     const { rows: posts } = await trendingRepository.getPostsByHash(hashtag);
//       res.status(200).send(posts);
//     if (posts.rowCount > 0) {
//       return res.status(409).send("There are no posts yet");
//     }
//   } catch (err) {
//     console.log(err);
//     return res
//       .status(500)
//       .send("An error occured while trying to fetch the posts, please refresh the page"); // server error
//   }
// };


