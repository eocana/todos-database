const express = require("express");
const cors = require("cors");
const { all, item, update, insert, remove } = require("./controller");

const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

app.get("/todos", all); //done

app.post("/todos", insert); //done

app.get("/todos/:id",item);

app.put("/todos/:id", update);

app.delete("/todos/:id", remove); //done

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
