const express = require("express");
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const todosRouter = require("./routers/todos.router.js")

const usersRouter = require("./routers/users.router.js")


//app.use("/todos", todosRouter);
app.use("/users", usersRouter);

app.all("*", (req, res) => { 
  res.status(404).json({ error: "Esta pagina no existe"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
