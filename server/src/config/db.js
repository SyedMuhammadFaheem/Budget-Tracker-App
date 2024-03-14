const dbConnect = require("typeorm");

const appDataSource = new dbConnect.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "Budget-Tracker-App",
    synchronize: true,
    entities: ["src/models/*.js"],
  logging: true,
  migrations: ["src/migrations/*.ts"]
  });
 

module.exports = appDataSource