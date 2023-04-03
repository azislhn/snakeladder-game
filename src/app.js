import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";

const app = express();

app.get("/", async (req, res) => {
  res.json({ payload: "Selamat Datang" });
});

app.get("/bank-soal", async (req, res) => {
  const [fields] = await pool.query(`SELECT * FROM bank`);

  res.json({ payload: "Bank Soal Kepramukaan", data: fields });
});

app.listen(PORT, () => {
  console.log("Server running...");
});
