const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("flairs/new", {
            postId: req.params.postId,
            topicId: postQueries.getPost(req.params.postId, (post) => {
                return post.topicId;
            })
        });
    }
}