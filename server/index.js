const dbConnect = require("typeorm");
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const app = express();
app.use(cors());

try {
  const appDataSource = new dbConnect.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "Budget-Tracker-App",
    synchronize: true,
    entities: ["models/*.js"]
  });
  appDataSource.initialize();
  console.log("PostgreSQL connection successful!");
} catch (error) {
  console.error(error);
  throw new Error("Unable to connect to database!");
}

app.listen(PORT, () => {
  console.log("Server is listening at 3001!");
});
