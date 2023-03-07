const express = require('express')
const { all, item, update, insert, remove } =
        require("../controllers/todos.controller");
const router = express.Router()


router.get("/", all); 

router.get("/:id",item);

router.post("/", insert); 

router.put("/:id", update);

router.delete("/:id", remove); 


module.exports = router;