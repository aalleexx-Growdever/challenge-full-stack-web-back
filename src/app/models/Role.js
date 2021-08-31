import Sequelize, { Model } from 'sequelize';

class Role extends Model {
  static init(sequelize) {
    super.init(
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
      },
      {
        sequelize,
        schema: 'challenge',
        tableName: 'roles',
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.User, {
      as: 'user_role',
      sourceKey: 'name',
      foreignKey: 'role',
    });
  }

  static parseConditions(data) {
    const { name } = data;

    const conditions = {};

    if (name) {
      conditions.name = name;
    }

    return { conditions };
  }
}

export default Role;
