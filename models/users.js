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
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Posts, { //user 1 : post 다

        as: "Posts",
        foreignKey: "userId", 
        foreignKey: "nickname",
        
      })



    }
  }
  Users.init({
    userId: {
      allowNull: false,  //Null 값을 허용하는가 ? -> Null을 허용하지 않는다.
      autoIncrement: true,  //기본키에 데이터를 넣지 않으면 자동적으로 1씩 증가한 데이터가 삽입된다.
      primaryKey: true ,     //기본키
      type: DataTypes.INTEGER,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
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
    modelName: 'Users',
  }

  
  
  );
  return Users;
};