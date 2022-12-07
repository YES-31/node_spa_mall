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
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comments.init({
    commentId: {
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
    postId: {
      type: DataTypes.INTEGER,
      //관계 설정하기.
      references: { //user의 userId와 관계를 설정하였다.
        model: 'Posts', //어떤 테이블인지
        key: 'postId',    // 어떤 테이블의 어떤 column인지
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

    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
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
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};