import express from "express";
import pool from "./config/db.js";
const app = express();

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0]);
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});