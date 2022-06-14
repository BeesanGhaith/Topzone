// require express
const express = require("express");

const cors = require("cors");

require("dotenv").config();

// instantiate express
const app = express();

// require the file to execute it
const db = require("./database/db");

app.use(cors());

app.use(express.json());

// Import Routers
const usersRouter = require("./routes/user");
const loginRouter = require("./routes/login");

// Routes Middleware
app.use("/users", usersRouter);
app.use("/login", loginRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
