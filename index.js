const express = require("express");
const cors = require("cors");
const { all, item, update, insert, remove } = require("./database");

const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  all(req, res);
});

app.post("/todos/:id", (req, res) => {
  insert(req, res);
});

app.get("/todos/:id", (req, res) => {});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
