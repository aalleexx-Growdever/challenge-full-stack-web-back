module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'users',
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
        role: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'roles',
            key: 'name',
          },
        },
        password_hash: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
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
      tableName: 'users',
      schema: 'challenge',
    });
  },
};
