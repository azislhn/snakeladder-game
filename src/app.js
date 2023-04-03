import express from "express";
import { pool } from "./db.js";
import { PORT } from "./config.js";
import { jsonWebToken } from "./token.js";
import { response } from "./response.js";

const app = express();

app.get("/", async (req, res) => {
  res.json("Selamat Datang");
});

app.get("/bank-soal/all", async (req, res) => {
  const [fields] = await pool.query(`SELECT * FROM bank`);
  const token = jsonWebToken(fields);
  res.json(token);
});

app.get("/bank-soal/:id", async (req, res) => {
  const [fields] = await pool.query(
    `SELECT * FROM bank WHERE id="${req.params.id}"`
  );
  const token = jsonWebToken(fields);
  res.json(token);
});

app.get("/bank-soal/:id/:kunci", async (req, res) => {
  const [fields] = await pool.query(
    `SELECT * FROM bank WHERE id="${req.params.id}"`
  );
  const key = req.params.kunci;
  if (key == fields[0].answer) {
    const payload = response(
      "Jawaban Benar",
      fields[0].question,
      fields[0][key],
      "correct"
    );
    const token = jsonWebToken(payload);
    res.json(token);
    // res.send(response("Jawaban Benar", fields[0].question, fields[0][key], "correct"));
  } else {
    const payload = {
      message: "Jawaban Salah",
      question: fields[0].question,
      answer: fields[0][key],
      type: "wrong",
    };
    const token = jsonWebToken(payload);
    res.json(token);
    // res.send(response("Jawaban Salah", fields[0].question, fields[0][key], "wrong"));
  }
});

app.listen(PORT, () => {
  console.log("Server is running...");
});
