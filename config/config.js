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
    "port": 5433
  },
  "production": {
    "username": "bgerjcgagnpdrc",
    "password": "21f67079e2098ec966c4c1d855f81bfd0b6227abd52c608776fc0cb530b43a0c",
    "database": "dni7qu1q0gtd3",
    "host": "ec2-3-229-11-55.compute-1.amazonaws.com",
    "dialect": "postgres",
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
}
