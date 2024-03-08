const appDataSource = require("./config/db");
const morgan = require('morgan')
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const authRoutes = require("./Routes/authRouter");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan('dev'))
app.use("/user", authRoutes);

try {
  appDataSource.initialize().then(() => {
    console.log("PostgreSQL connection successful!");
  });
} catch (error) {
  console.error(error);
  throw new Error("Unable to connect to database!");
}

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}!`);
});
