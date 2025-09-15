// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "123456",
//   DB_NAME: "daily_mart",
//   dialect: "mysql",
//   dialectOptions: {
//     supportBigNumbers: true
//   },
//   innodb_log_file_size: "512M",
//   innodb_strict_mode: 1,
//   pool: { 
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };


module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Home@10010Home",
  DB_NAME: "daily_mart",
  dialect: "mysql",
  dialectOptions: {
    supportBigNumbers: true
  },
  innodb_log_file_size: "512M",
  innodb_strict_mode: 1,
  logging: false,
  pool: { 
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};