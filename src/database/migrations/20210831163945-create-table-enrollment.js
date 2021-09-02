module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'enrollments',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        course: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'courses',
            key: 'course',
          },
        },
        student_cpf: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'students',
            key: 'cpf',
          },
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
      tableName: 'enrollments',
      schema: 'challenge',
    });
  },
};
