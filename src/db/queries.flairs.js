const Topics = require("./models").Topics;
const Post = require("./models").Post;
const Flair = require("./models").Flair;

module.exports = {

    getFlair(id, callback) {
        return Flair.findById(id)
            .then((flair) => {
                callback(null, flair);
            })
            .catch((err) => {
                callback(err);
            })
    }
}