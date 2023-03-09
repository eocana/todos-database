const express = require('express')
const { all, item, update, insert, remove,  allTodosByUserId} =
        require("../controllers/todos.controller");
const router = express.Router({mergeParams:true})


router.get("/", allTodosByUserId); 

router.get("/:id",item);

router.post("/", insert); 

router.put("/:id", update);

router.delete("/:id", remove); 


module.exports = router;