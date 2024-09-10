import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Job = sequelize.define(
  'Job',
  {
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    initContract: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    finishContract: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
        isAfter(value) {
          if (new Date(value) <= new Date(this.initContract)) {
            throw new Error(
              'La fecha de fin debe ser posterior a la fecha de inicio'
            );
          }
        },
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
