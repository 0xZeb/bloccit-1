const Ads = require("./models").Ads;

module.exports = {

    getAllAds(callback) {
        return Ads.all()

            .then((ads) => {
                callback(null, ads);
            })
            .catch((err) => {
                callback(err);
            })
    },

    addAd(newAd, callback) {
        return Ads.create({
            title: newAd.title,
            description: newAd.description
        })
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },

    getAd(id, callback) {
        return Ads.findById(id)
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },

    deleteAd(id, callback) {
        return Ads.destroy({
            where: { id }
        })
            .then((ad) => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            })
    },

    updateAd(id, updatedAd, callback) {
        return Ads.findById(id)
        .then((ad) => {
            if(!ad){
                return callback("Ad not found");
            }

            ad.update(updatedAd, {
                fields: Object.keys(updatedAd)
            })
            .then(() => {
                callback(null, ad);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }
}