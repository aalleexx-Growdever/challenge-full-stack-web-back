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
        class: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'classes',
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

    this.belongsTo(models.Class, {
      as: 'enrollment_class',
      foreignKey: 'class',
      targetKey: 'course',
    });
  }

  static parseConditions(data) {
    const { class_course, student_cpf } = data;

    const conditions = {};

    if (class_course) {
      conditions.class = class_course;
    }
    if (class_course) {
      conditions.student_cpf = student_cpf;
    }

    return { conditions };
  }
}

export default Enrollment;
