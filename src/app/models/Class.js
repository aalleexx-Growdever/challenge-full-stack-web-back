import Sequelize, { Model } from 'sequelize';

class Class extends Model {
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
        tableName: 'classes',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Enrollment, {
      as: 'class_enrollments',
      sourceKey: 'course',
      foreignKey: 'class',
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

export default Class;
