import hashtagsRepository from "../repositories/trending.repository.js";

const findOrCreateHashtag = async (data) => {
    try {
        const splittedWords = data.split(" ");
        const hashtagsPost = splittedWords.filter((word) =>
            word.startsWith("#"),
        );
        if (!hashtagsPost.length) return 0;
        const hashtags = hashtagsPost.filter(
            (hashtag, i) => hashtagsPost.indexOf(hashtag) === i,
        );
        const hashtagWithoutHash = hashtags.map((hashtag) =>
            hashtag.replace("#", ""),
        );
        const hashtagsInDb = (await hashtagsRepository.getAllHashtag()).rows;
        let buildQuery = "";
        const hashtagIds = [];
        hashtagWithoutHash.forEach((hashtag, i) => {
            const lastIndex = hashtagWithoutHash.length - 1;
            const isInDb = hashtagsInDb.find(
                (hashtagDb) => hashtagDb.name === hashtag,
            );

            if (isInDb) hashtagIds.push({ id: isInDb.id });
            if (!isInDb) buildQuery += `('${hashtag}'), `;
            if (i === lastIndex) buildQuery = buildQuery.slice(0, -2);
        });
        if (buildQuery) {
            const hashtagIdsInserted =
                await hashtagsRepository.insertManyHashtags(buildQuery);
            hashtagIds.push(...hashtagIdsInserted);
        }
        console.log("created")
        return hashtagIds;

    } catch (err) {
        console.log(err);
        return -1;
    }
};

export default findOrCreateHashtag;