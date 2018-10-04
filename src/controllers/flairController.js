const flairQueries = require("../db/queries.flairs.js");
const postQueries = require("../db/queries.posts.js");

module.exports = {
    new(req, res, next) {
        res.render("flairs/new", {
            postId: req.params.postId,
            topicId: postQueries.getPost(req.params.postId, (post) => {
                return post.topicId;
            })
        });
    },

    create(req, res, next) {
        let newFlair = {
            title: req.body.title,
            body: req.body.body,
            postId: req.params.postId,
            topicId: req.params.topicId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if (err) {
                res.redirect(500, "/flairs/new");
            } else {
                res.redirect(303, `/posts/${post.id}/flairs/${flair.id}`);
            }
        });
    },

    show(req, res, next) {
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if (err || flair == null) {
                res.redirect(404, "/");
            } else {
                res.render("flairs/show", {
                    flair
                });
            }
        });
    }
}