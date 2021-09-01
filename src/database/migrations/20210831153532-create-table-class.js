module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'classes',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        course: {
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
      tableName: 'classes',
      schema: 'challenge',
    });
  },
};
