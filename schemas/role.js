const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection');

class Role extends Model {}

Role.init(
    {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true
},
title: {
    type: DataTypes.STRING
},
salary: {
    type: DataTypes.DECIMAL
},
department_id: {
    type: DataTypes.INTEGER
}
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: false,
    }
)
    module.exports = Role;