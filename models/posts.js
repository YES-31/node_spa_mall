'use strict';
const {
  Model
} = require('sequelize');

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/



module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, { //가져오는 입장

        foreignKey: "userId", 
        foreignKey: "nickname",
        
      }),

      this.hasMany(models.Likes, {
        as: "Likes",
        foreignKey: "postId", 
        

      })
      
    }
  }
  Posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },

    userId: {
      type: DataTypes.INTEGER,

      //관계 설정하기.
      references: { //user의 userId와 관계를 설정하였다.
        model: 'Users', //어떤 테이블인지
        key: 'userId',    // 어떤 테이블의 어떤 column인지
      },
      onDelete: 'CASCADE',
      allowNull: false,
    },

    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      references: { //user의 userId와 관계를 설정하였다.
        model: 'Users', //어떤 테이블인지
        key: 'nickname',    // 어떤 테이블의 어떤 column인지
      },
      onDelete: 'CASCADE',

    },

    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
    likes:{
      type: DataTypes.INTEGER,
      //관계 설정하기.
      references: { //user의 userId와 관계를 설정하였다.
        model: 'Likes', //어떤 테이블인지
        key: 'likeId',    // 어떤 테이블의 어떤 column인지
      },
      onDelete: 'CASCADE',
      allowNull: false,
      defaultValue: 0,

    },

  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};