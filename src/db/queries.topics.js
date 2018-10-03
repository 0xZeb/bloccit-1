const Topics = require("./models").Topics;

const Post = require("./models").Post;

module.exports = {

    //#1
    getAllTopics(callback) {
        return Topics.all()

            //#2
            .then((topics) => {
                callback(null, topics);
            })
            .catch((err) => {
                callback(err);
            })
    },

    addTopic(newTopic, callback) {
        return Topics.create({
            title: newTopic.title,
            description: newTopic.description
        })
            .then((topic) => {
                callback(null, topic);
            })
            .catch((err) => {
                callback(err);
            })
    },

    getTopic(id, callback) {
       return Topics.findById(id)

        return Topics.findById(id, {

            include: [{
                model: Post,
                as: "posts"
            }]
        })
            .then((topic) => {
                callback(null, topic);
            })
            .catch((err) => {
                callback(err);
            })
    },

    deleteTopic(id, callback) {
        return Topics.destroy({
            where: { id }
        })
            .then((topic) => {
                callback(null, topic);
            })
            .catch((err) => {
                callback(err);
            })
    },

    updateTopic(id, updatedTopic, callback) {
        return Topics.findById(id)
            .then((topic) => {
                if (!topic) {
                    return callback("Topic not found");
                }

                //#1
                topic.update(updatedTopic, {
                    fields: Object.keys(updatedTopic)
                })
                    .then(() => {
                        callback(null, topic);
                    })
                    .catch((err) => {
                        callback(err);
                    });
            });
    }

}