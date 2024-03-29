const { Model, DataTypes } = require('sequelize')
const sequelize = require('../connection');

class Employee extends Model {}

Employee.init(
    {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
},
first_name: {
    type: DataTypes.STRING
},
last_name: {
    type: DataTypes.STRING
},
role_id: {
    type: DataTypes.INTEGER,
},
manager_id: {
    type: DataTypes.INTEGER,
}
    },
    {
      sequelize,
      modelName: 'Employee',
      timestamps: false,
    }
    );
    
    module.exports = Employee;