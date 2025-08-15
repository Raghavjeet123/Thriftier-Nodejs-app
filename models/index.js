const { Sequelize } = require('sequelize');
require('dotenv').config();

const DIALECT = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (DIALECT === 'mysql') {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'students_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASS || '',
    {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      dialect: 'mysql',
      logging: false
    }
  );
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || './data/db.sqlite',
    logging: false
  });
}

module.exports = { sequelize };
