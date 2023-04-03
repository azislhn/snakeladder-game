import express from "express";

const app = express();

app.get("/", async (req, res) => {
  // const [rows] = await
  res.json("Developing");
});

app.listen(3000, () => {
  console.log("Server running...");
});
