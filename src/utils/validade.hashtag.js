import hashtagsRepository from "../repositories/hashtags.repository.js";

const existingHashtagValidate = async (hashtag) => {
    try {
        const result = await hashtagsRepository.getHashtagByName(hashtag);
        if (result.rows.length) return true;
        return false;
    } catch (err) {
        console.log(err);
        return -1;
    }
};

export default existingHashtagValidate;