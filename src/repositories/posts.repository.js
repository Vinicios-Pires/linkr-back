import db from "../config/db.js"

const getAllPosts = async => {
    const {rows: posts} = await.db.query(`
    SELECT description
    FROM posts
    JOIN users ON posts.userId  = users.id
    ORDER BY timestamp DESC
    LIMIT 20
    `);
    return posts;
}

const postsRepository= {
    getAllPosts
}

export default postsRepository