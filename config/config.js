require('dotenv').config();

module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5433
  },
  "test": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "db_ch6_test",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5432
  },
  "production": {
    "username": "ugdsrwlyhgsxiw",
    "password": "20af85a035526461184adff5cdec41a28e2e905b803b4d5c28a51217e4d6eea4",
    "database": "d8o6pk1oh9n1uq",
    "host": "ec2-23-23-182-238.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
}
