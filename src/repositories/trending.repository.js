import db from "../config/db.js";

const getTrendingHashtags = async () => {
    return await db.query(`--sql
        SELECT hashtags.* FROM hashtags
            LEFT JOIN "postHashtag" ON "postHashtag"."hashtagId" = hashtags.id
        GROUP BY hashtags.id
        HAVING COUNT("postHashtag"."hashtagId") > 0
        ORDER BY COUNT("postHashtag"."hashtagId") DESC 
        LIMIT 10
    `);
};

const getPostsByHash = async (userId, hashtag) => {
    return await db.query(
        `SELECT p.id, p.description, post_author."pictureUrl", post_author.username, post_author.id as "authorId",
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
    JOIN "postHashtag" ph ON ph."postId" = p.id 
    JOIN hashtags h ON h.id = ph."hashtagId"
    LEFT JOIN likes ON likes."postId" = p.id
    LEFT JOIN users user_who_liked ON likes."userId" = user_who_liked.id

    WHERE h.name = $2
    ORDER BY p."createdAt" DESC LIMIT 20;`,
      [userId, hashtag],
    );
  };

export const trendingRepository = {
  getTrendingHashtags,
  getPostsByHash,
}

const formatPostHashtagQuery = (postId, hashtagIds) => {
    const buildQuery = hashtagIds.map(
        (hashtag) => `(${postId}, ${hashtag.id})`,
    );
    const joinAll = buildQuery.join(", ");
    return joinAll;
};

const getAllHashtag = async () => {
    return await db.query("SELECT * FROM hashtags");
};

const getHashtagByName = (name) => {
    return db.query("SELECT * FROM hashtags WHERE name ~* $1", [name]);
};


const insertManyHashtags = async (names) => {
    return (
        await db.query(
            `--sql
        INSERT INTO hashtags (name) VALUES ${names}
        RETURNING id
    `,
        )
    ).rows;
};

const insertManyPostHashtags = async (postId, hashtagsIds) => {
    const buildedQuery = formatPostHashtagQuery(postId, hashtagsIds);
    await db.query(
        `--sql
        INSERT INTO "postHashtag" ("postId", "hashtagId") 
        VALUES ${buildedQuery}
        `,
    );
};

const deleteHashtagsByPostIdAndUserId = async (postId, userId) => {
    return await db.query(
        `--sql
            DELETE FROM "postHashtag" 
            USING posts
            WHERE "postId" = $1 AND "userId" = $2
    `,
        [postId, userId],
    );
};

const hashtagsRepository = {
    getTrendingHashtags,
    getHashtagByName,
    getAllHashtag,
    getPostsByHash,
    insertManyHashtags,
    insertManyPostHashtags,
    deleteHashtagsByPostIdAndUserId,
    formatPostHashtagQuery,
};

export default hashtagsRepository;