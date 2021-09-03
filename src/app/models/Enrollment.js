import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
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
      },
      {
        sequelize,
        schema: 'challenge',
        tableName: 'enrollments',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      as: 'enrollment_student',
      foreignKey: 'student_cpf',
      targetKey: 'cpf',
    });

    this.belongsTo(models.Course, {
      as: 'enrollment_course',
      foreignKey: 'course',
      targetKey: 'course',
    });
  }

  static parseConditions(data) {
    const { course, student_cpf } = data;

    const conditions = {};

    if (course) {
      conditions.course = course;
    }
    if (student_cpf) {
      conditions.student_cpf = student_cpf;
    }

    return { conditions };
  }
}

export default Enrollment;
