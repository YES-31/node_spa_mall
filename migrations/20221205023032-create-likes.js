'use strict';
/**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      likeId: {
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
      postId: {
        type: Sequelize.DataTypes.INTEGER,
        //관계 설정하기.
        references: { //user의 userId와 관계를 설정하였다.
          model: 'Posts', //어떤 테이블인지
          key: 'postId',    // 어떤 테이블의 어떤 column인지
        },
        onDelete: 'CASCADE',
        allowNull: false,
        
      },

      state: {
        type: Sequelize.DataTypes.STRING,
      },

    });
  },

/**
   * @param {import("sequelize").QueryInterface} queryInterface - Sequelize Query Interface
   * @param {import("sequelize")} Sequelize - Sequelize
   * **/


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Like');
  }
};