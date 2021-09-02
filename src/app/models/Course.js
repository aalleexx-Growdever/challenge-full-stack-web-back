import Sequelize, { Model } from 'sequelize';

class Course extends Model {
  static init(sequelize) {
    super.init(
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
      },
      {
        sequelize,
        schema: 'challenge',
        tableName: 'courses',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Enrollment, {
      as: 'course_enrollments',
      sourceKey: 'course',
      foreignKey: 'course',
    });
  }

  static parseConditions(data) {
    const { course } = data;

    const conditions = {};

    if (course) {
      conditions.course = course;
    }
    return { conditions };
  }
}

export default Course;
