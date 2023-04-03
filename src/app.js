import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "./db.js";
import { PORT, SECRET_KEY } from "./config.js";

const app = express();
const secretKey = SECRET_KEY;

app.get("/", async (req, res) => {
  res.json({ message: "Selamat Datang" });
});

app.get("/bank-soal", async (req, res) => {
  const [fields] = await pool.query(`SELECT * FROM bank`);
  const token = jwt.sign({ payload: fields }, secretKey, {
    algorithm: "HS256",
  });
  res.json({ token: token });
});

app.listen(PORT, () => {
  console.log("Server running...");
});
