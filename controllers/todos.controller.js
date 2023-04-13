// const { asyncAll, asyncRemove, asyncItem } = require("./database.js");
const db = require("../daos/todos.dao");

// new async/await syntax:
async function all(req, res) {
  try {
    const rows = await db.all();
    res.json(rows);
  } catch (ex) {
    res.status(500).json({ error: err });
  }
}

async function allTodosByUser(req, res, next) {
  console.log("alltodosbyuser", req.USER_ID);
   try {
    const id = req.USER_ID;
    const todos = await db.allTodosByUser(id);
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      const tags = await db.getTagsByTodoId(todo.id);
      todo.tags = tags;
    }
    res.json(todos);
  } catch (ex) {
    next(ex);
  }
}

async function item(req, res) {
  try {
    const row = await db.item(req.params.id);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex.message });
  }
}

async function insert(req, res) {
 
  const data = req.body;
  try {
    const row = await db.insert(data);
    res.json(row);
  } catch (ex) {
    res.status(500).json({ error: ex.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { done } = req.body;

    await db.update(id, done);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }

  return;
}

async function remove(req, res) {
  try {
    await db.remove(req.params.id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }

  return;
}

async function removeQString(req, res) {
  try {
    await db.remove(req.query.id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }

  return;
}

async function addTagToTodo(req, res) {
  try {
    const { todo_id, tag_id } = req.params;

    await db.addTagToTodo(todo_id, tag_id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
}

async function removeTagFromTodo(req, res) {
  try {
    const { todo_id, tag_id } = req.params;

    await db.removeTagFromTodo(todo_id, tag_id);
    res.status(200).json({});
  } catch (ex) {
    res.status(500).json({ error: ex });
  }
}

module.exports = {
  all,
  allTodosByUser,
  item,
  insert,
  update,
  remove,
  addTagToTodo,
  removeTagFromTodo,
};
