module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('wallet', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        balance: {
          type: Sequelize.DOUBLE,
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
        queryInterface.addIndex('wallet', ['id', 'user_id', 'balance', 'created_at', 'updated_at']),
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wallet');
  },
};
