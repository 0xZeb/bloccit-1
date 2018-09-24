const Topics = require("./models").Topics;

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
    }
}