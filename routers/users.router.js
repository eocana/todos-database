const express = require("express");
const {
  all,
  item,
  update,
  insert,
  remove,
} = require("../controllers/users.controller");

const router = express.Router();

const todosRouter = require("./todos.router");

router.get("/", all);
router.get("/:id", item);
router.post("/", insert);
router.delete("/:id", remove);
router.put("/:id", update);

router.use("/:id_user/todos", todosRouter);

router.param("id_user", (req, res, next, value) => {
  req.USER_ID = Number(value); //Number porque es un string value y queremos un numero
  next();
});
// router.use("/:id/todos", () => {
//   console.log("x");
// });

module.exports = router;
