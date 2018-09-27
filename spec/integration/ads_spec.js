const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ads = require("../../src/db/models").Ads;

beforeEach((done) => {
    this.ad;
    sequelize.sync({ force: true }).then((res) => {

        Ads.create({
            title: "I wanna sell you something",
            description: "Ads go here"
        })
            .then((ad) => {
                this.ad = ad;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });

    });

});

describe("routes : ads", () => {

    describe("GET /ads", () => {

        it("should return a status code 200 and show all ads", (done) => {

            //#3
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Ads go here");
                done();
            });
        });

    });

});