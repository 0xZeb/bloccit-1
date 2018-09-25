'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rules = sequelize.define('Rules', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Rules.associate = function(models) {
    // associations can be defined here
    Rules.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Rules;
};