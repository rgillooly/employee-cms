const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
    }
  },
  {
    sequelize,
    modelName: 'Department',
    timestamps: false,
  }
);

module.exports = Department;
