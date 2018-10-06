const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {
    beforeEach((done) => {
        //#1
        this.topic;
        this.post;
        sequelize.sync({
            force: true
        }).then((res) => {
            //#2
            Topics.create({
                    title: "Best David Bowie Songs",
                    description: "Ruminations on Mr. Bowie's best work."
                })
                .then((topic) => {
                    this.topic = topic;
                    //#3
                    Post.create({
                            title: "Let's Dance",
                            body: "Put on your red shoes and dance the blues.",
                            //#4
                            topicId: this.topic.id
                        })
                        .then((post) => {
                            this.post = post;
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe("#create()", () => {
        it("should create a topics object that is stored in the database", (done) => {
            //#1
            Topics.create({
                    title: "Lazarus",
                    body: "The one about Bowie's cancer.",
                })
                .then((topics) => {
                    //#2
                    expect(topics.title).toBe("Lazarus");
                    expect(topics.description).toBe("The one about Bowie's cancer.");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });
    describe("#getPosts()", () => {
        it("should create and associate a topic and a post together", (done) => {
            this.topics.getPosts(newPost)
                .then((newPost) => {
                    expect(newPost.topicId).toBe(this.topics.id);
                });
        });
        it("should return an array of post objects associated with topic", (done) => {
            this.topics.getPosts()
                .then((postArray) => {
                    expect(postArray.title).toBe("Best David Bowie Songs");
                    done();
                });
        });
        it("should confirm associate post and is returned when method is called", (done) => {
            this.topics.getPosts().then((posts) => {
                expect(posts[0].title).toContain("Let's Dance");
                expect(posts[0].description).toContain("Put on your red shoes and dance the blues.");
                done();
            });
        });
    });
});