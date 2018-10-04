const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/posts";

const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;

        sequelize.sync({
            force: true
        }).then((res) => {

            //#1
            Topics.create({
                    title: "Winter Games",
                    description: "Post your Winter Games stories."
                })
                .then((topic) => {
                    this.topic = topic;

                    Post.create({
                            title: "Snowball Fighting",
                            body: "So much snow!",
                            topicId: this.topic.id
                        })
                        .then((post) => {
                            this.post = post;

                            Flair.create({
                                    name: "Heart flair",
                                    color: "red",
                                    postId: this.post.id,
                                    topicId: this.topic.id
                                })
                                .then((flair) => {
                                    this.flair = flair;
                                    done();
                                })
                                .catch((err) => {
                                    console.log(err);
                                    done();
                                });
                        });
  
                });
        });

    });

    describe("GET /posts/:postId/flair/new", () => {
        it("should render a new flair form", (done) => {
            request.get(`${base}/${this.post.id}/flairs/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Flair");
                done();
            });
        });
    });

    describe("POST /posts/:postId/flairs/create", () => {

        it("should create a new flair and redirect", (done) => {
            const options = {
                url: `${base}/${this.post.id}/flairs/new`,
                form: {
                    name: "Heart flair",
                    color: "red"
                }
            };
            request.post(options,
                (err, res, color) => {

                    Flair.findOne({
                            where: {
                                name: "Heart flair"
                            }
                        })
                        .then((flair) => {
                            expect(flair).not.toBeNull();
                            expect(flair.name).toBe("Heart flair");
                            expect(flair.color).toBe("red");
                            expect(flair.postId).not.toBeNull();
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });

    });

    describe("GET /posts/:postId/flairs/:id", () => {

        it("should render a view with the selected flair", (done) => {
            request.get(`${base}/${this.post.id}/flairs/${this.flair.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Heart flair");
                done();
            });
        });

    });

});