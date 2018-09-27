const Ads = require("./models").Ads;

module.exports = {

    //#1
    getAllAds(callback) {
        return Ads.all()

            //#2
            .then((ads) => {
                callback(null, ads);
            })
            .catch((err) => {
                callback(err);
            })
    }
}