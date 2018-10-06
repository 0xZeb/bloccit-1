const sequelize = require("../../src/db/models/index").sequelize;
const Topics = require("../../src/db/models").Topics;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {
    
   beforeEach((done) => {
       this.topic;
       this.post;
       this.user;

       sequelize.sync({
           force: true
       }).then((res) => {

           // #2
           User.create({
                   email: "starman@tesla.com",
                   password: "Trekkie4lyfe"
               })
               .then((user) => {
                   this.user = user; //store the user

                   // #3
                   Topics.create({
                           title: "Expeditions to Alpha Centauri",
                           description: "A compilation of reports from recent visits to the star system.",

                           // #4
                           posts: [{
                               title: "My first visit to Proxima Centauri b",
                               body: "I saw some rocks.",
                               userId: this.user.id
                           }]
                       }, {

                           // #5
                           include: {
                               model: Post,
                               as: "posts"
                           }
                       })
                       .then((topic) => {
                           this.topic = topic; //store the topic
                           this.post = topic.posts[0]; //store the post
                           done();
                       })
               })
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