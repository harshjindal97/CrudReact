const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./router/authRouter");
const homeController = require("./router/homeController");
const db = require("./dataBase/db");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/auth", homeController);

  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
