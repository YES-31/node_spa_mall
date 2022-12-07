'use strict';
//세션 데이터자료 추가
  /**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false,  //Null 값을 허용하는가 ? -> Null을 허용하지 않는다.
        autoIncrement: true,  //기본키에 데이터를 넣지 않으면 자동적으로 1씩 증가한 데이터가 삽입된다.
        primaryKey: true ,     //기본키
        type: Sequelize.DataTypes.INTEGER,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      }
    });
  },

/**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
  
};