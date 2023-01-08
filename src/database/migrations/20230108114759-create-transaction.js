'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('transaction', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        amount: {
          type: Sequelize.DOUBLE,
        },
        type: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex('transaction', [
          'id',
          'user_id',
          'amount',
          'type',
          'created_at',
          'updated_at',
        ]),
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('transaction');
  },
};
