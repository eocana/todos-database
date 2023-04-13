const express = require("express");
const {
  all,
  allTodosByUser,
  item,
  update,
  insert,
  remove,
  addTagToTodo,
  removeTagFromTodo,
} = require("../controllers/todos.controller");

const router = express.Router();
// const router = express.Router({ mergeParams: true });

function autentificar(req, res, next) {
 const authHeader = req.header("Authorization");
 const token = authHeader.split(" ")[1];
 const jwt = require("jsonwebtoken");
  try { 
    var decoded = jwt.verify(token, process.env.PASSWORD_JWT);
    console.log(decoded.foo) // bar
    req.USER = decoded;
    return next();

  } catch (ex) { 
    
    return res.status(401).json({ error: "No tienes permisos" });
  }
}

function autorizacion(req, res, next) {
  const paramUserID = req.USER_ID;
  const userID = req.USER.id;

  console.log("IDs: ",paramUserID, userID);
  
  if (paramUserID === userID)  return next();
  return res.status(403).json({ error: "No estas autorizado" });
 
  
}

router.use(autentificar);
router.get("/", autorizacion, allTodosByUser);
router.get("/:id", autorizacion, item);
router.post("/", insert);
router.delete("/:id", remove);
router.put("/:id", update);
router.post("/:id/tags/:tag_id", addTagToTodo);
router.delete("/:id/tags/:tag_id", removeTagFromTodo);

module.exports = router;
