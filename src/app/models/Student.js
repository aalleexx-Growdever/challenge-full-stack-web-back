import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        academic_record: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          unique: true,
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
      },
      {
        sequelize,
        schema: 'challenge',
        tableName: 'students',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Enrollment, {
      as: 'student_enrollments',
      sourceKey: 'cpf',
      foreignKey: 'student_cpf',
    });
  }

  static parseConditions(data) {
    const { name } = data;
    const { email } = data;
    const { cpf } = data;

    const conditions = {};

    if (name) {
      conditions.name = name;
    }
    if (email) {
      conditions.email = email;
    }
    if (cpf) {
      conditions.cpf = cpf;
    }

    return { conditions };
  }
}

export default Student;
