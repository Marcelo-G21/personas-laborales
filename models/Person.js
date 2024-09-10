import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Job } from './Job.js';

export const Person = sequelize.define(
  'Person',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
  },
  {
    timestamps: true,
  }
);

Person.hasMany(Job, {
  foreignKey: 'personId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
Job.belongsTo(Person, { foreignKey: 'personId', targetId: 'id' });
