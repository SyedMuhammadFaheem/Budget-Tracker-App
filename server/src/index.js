const appDataSource = require("./config/db");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config");
const authRoutes = require("./Routes/authRouter");
const userRoutes = require("./Routes/userRouter");
const expenseRoutes = require("./Routes/expenseRouter");
const incomeRoutes = require("./Routes/incomeRouter");
const savingRoutes = require("./Routes/savingRouter");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/user", authRoutes);
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/saving", savingRoutes);

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
