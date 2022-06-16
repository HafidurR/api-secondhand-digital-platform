require('dotenv').config();

module.exports = {
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5432
  },
  "test": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "db_ch6_test",
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    "port": 5433
  },
  "production": {
    "username": "uzyeycnyhojdcu",
    "password": "ae28d2f3e5ab304108604cc309f02f8b00f3d4dbb56c4f34bff44aad6539bf4e",
    "database": "d3qk33cofb62d1",
    "host": "ec2-52-72-56-59.compute-1.amazonaws.com",
    "url": "postgres://uzyeycnyhojdcu:ae28d2f3e5ab304108604cc309f02f8b00f3d4dbb56c4f34bff44aad6539bf4e@ec2-52-72-56-59.compute-1.amazonaws.com:5432/d3qk33cofb62d1",
    "dialect": "postgres",
    "port": 5432,
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
}
