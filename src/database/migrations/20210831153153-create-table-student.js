module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'students',
      {
        academic_record: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        cpf: {
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
      tableName: 'students',
      schema: 'challenge',
    });
  },
};
