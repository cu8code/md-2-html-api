const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const l = console.log;
const app = express();
const port = 3000;
const book = ["baba"];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/book", (req, res) => {
  const body = req.body;
  book.push(body);
  res.send("Book is added to the database");
});

app.get("/book", (req, res) => {
  const body = req.body;
  res.json({
    "asdf":"alsdfj"
  });
});

app.listen(port, () => l(`https://localhost:${port}`));
