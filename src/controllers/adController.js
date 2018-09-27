const adQueries = require("../db/queries.ads.js");

module.exports = {
    index(req, res, next) {
        adQueries.getAllAds((err, ads) => {

            if (err) {
                res.redirect(500, "static/index");
            } else {
                res.render("ads/index", { ads });
            }
        })

    }
}