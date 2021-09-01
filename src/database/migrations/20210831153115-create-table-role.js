module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'roles',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        schema: 'challenge',
      }
    );
  },

  down: async queryInterface => {
    await queryInterface.dropTable({
      tableName: 'roles',
      schema: 'challenge',
    });
  },
};
