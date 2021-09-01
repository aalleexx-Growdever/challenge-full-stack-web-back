import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
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
        password: {
          type: Sequelize.DataTypes.VIRTUAL,
        },
        password_hash: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        schema: 'challenge',
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.Role, {
      as: 'user_role',
      targetKey: 'name',
      foreignKey: 'role',
    });
  }

  static parseConditions(data) {
    const { name } = data;
    const { cpf } = data;
    const { role } = data;

    const conditions = {};

    if (name) {
      conditions.name = name;
    }
    if (cpf) {
      conditions.cpf = cpf;
    }
    if (role) {
      conditions.role = role;
    }

    return { conditions };
  }
}

export default User;
