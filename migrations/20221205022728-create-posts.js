'use strict';

/**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      postId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },

      userId: {
        type: Sequelize.DataTypes.INTEGER,

        //관계 설정하기.
        references: { //user의 userId와 관계를 설정하였다.
          model: 'Users', //어떤 테이블인지
          key: 'userId',    // 어떤 테이블의 어떤 column인지
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },

      nickname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: { //user의 userId와 관계를 설정하였다.
          model: 'Users', //어떤 테이블인지
          key: 'nickname',    // 어떤 테이블의 어떤 column인지
        },
        onDelete: 'CASCADE',

      },

      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
      },
      
      likes:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,

      },

    });
  },

/**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};