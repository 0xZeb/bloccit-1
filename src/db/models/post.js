'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here

    Post.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Flair, {
      foreignKey: "flairId",
      as: "flairs"
    });
  };
  return Post;
};