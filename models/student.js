const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING(120), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  phone: { type: DataTypes.STRING(20), allowNull: true },
  course: { type: DataTypes.STRING(80), allowNull: false }
}, {
  tableName: 'students',
  timestamps: true
});

module.exports = Student;
