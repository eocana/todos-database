const express = require('express')
const { all, item, update, insert, remove, allTodosByUserId
} = require("../controllers/users.controller");
const router = express.Router()
const todosRouter = require("../routers/todos.router")

router.get("/", all); 

router.get("/:id",item);

router.post("/", insert); 

router.put("/:id", update);

router.delete("/:id", remove); 

router.use("/:id/todos", todosRouter);

// router.get("/:id/todos", allTodosByUserId);



module.exports = router;