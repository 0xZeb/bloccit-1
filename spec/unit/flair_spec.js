const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db/models").Topics;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    beforeEach((done) => {
        //#1
        this.topic;
        this.flair;
        sequelize.sync({
            force: true
        }).then((res) => {

            //#2
            Topics.create({
                    title: "Expeditions to Alpha Centauri",
                    description: "A compilation of reports from recent visits to the star system."
                })
                .then((topic) => {
                    this.topic = topic;
                    //#3
                    Flair.create({
                            name: "Willy Flair",
                            color: "Mackeral tabby",
                            //#4
                            topicId: this.topic.id
                        })
                        .then((flair) => {
                            this.flair = flair;
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

        it("should create a flair object with a name, color and assigned topic", (done) => {
            //#1
            Flair.create({
                    name: "Heart Flair",
                    color: "pink",
                    topicId: this.topic.id
                })
                .then((flair) => {

                    //#2
                    expect(flair.name).toBe("Heart Flair");
                    expect(flair.color).toBe("pink");
                    done();

                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a flair with missing name, color, or assigned topic", (done) => {
            Flair.create({
                    name: "Yellow Flair"
                })
                .then((flair) => {

                    // the code in this block will not be evaluated since the validation error
                    // will skip it. Instead, we'll catch the error in the catch block below
                    // and set the expectations there

                    done();

                })
                .catch((err) => {

                    expect(err.message).toContain("Flair.color cannot be null");
                    expect(err.message).toContain("Flair.topicId cannot be null");
                    done();

                })
        });

    });

    describe("#setTopic()", () => {

        it("should associate a topic and a flair together", (done) => {

            // #1
            Topics.create({
                    title: "Challenges of interstellar travel",
                    description: "1. The Wi-Fi is terrible"
                })
                .then((newTopic) => {

                    // #2
                    expect(this.flair.topicId).toBe(this.topic.id);
                    // #3
                    this.flair.setTopic(newTopic)
                        .then((flair) => {
                            // #4
                            expect(flair.topicId).toBe(newTopic.id);
                            done();

                        });
                })
        });

    });

    describe("#getTopic()", () => {

        it("should return the associated topic", (done) => {

            this.flair.getTopic()
                .then((associatedTopic) => {
                    expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
                    done();
                });

        });

    });
});