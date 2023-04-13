const DBSOURCE = "./todos.sqlite"; 

const betterSqlite3 = require("better-sqlite3");
const db = betterSqlite3(DBSOURCE);

function all() {
  const stm = db.prepare("SELECT * FROM todos");
  const rows = stm.all();
  return transformarLaSalida(rows);
}

function allTodosByUser(id) {
  const stm = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const rows = stm.all(id);
  return transformarLaSalida(rows);
}

function transformarLaSalida(rows) {
  const mappedRows = rows.map((elem) => {
    // const x = {...elem}

    // const nuevoElemento = {
    //   id: elem.id,
    //   todo: elem.todo,
    //   done: Boolean(elem.done),
    // };
    // return nuevoElemento;

    return {
      ...elem,
      done: Boolean(elem.done),
      text: `${ elem.title}, ${elem.description}`
    };
  });

  // const mappedRows = rows;

  return mappedRows;
}

function item(id) {
  
  const stm = db.prepare("SELECT * FROM todos WHERE id = ?");

  const row = stm.get(id);

  return transformarLaSalida([row])[0];
}

function insert(data) {
  
  const { user_id, title, description } = data;

  const stm = db.prepare("INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)");

  const info = stm.run(user_id, title, description);

  return item(info.lastInsertRowid);
}

function update(id, done) {
  // done es un boolean y en base de datos es un integer
  const intDone = done ? 1 : 0;
  const stm = db.prepare("UPDATE todos SET done = ? WHERE id = ?");
  const rows = stm.run(intDone, id);
  return rows;
}

function remove(id) {
  const stm = db.prepare("DELETE FROM todos WHERE id = ?");
  const rows = stm.run(id);
  return rows;
}


function getTagsByTodoId(todoId) {
  const stm = db.prepare(`
    SELECT tags.id, tags.name
    FROM todos_tags
    JOIN tags ON tags.id = todos_tags.tag_id
    WHERE todos_tags.todo_id = ?
  `);
  const rows = stm.all(todoId);
  return rows;
}

module.exports = {
  all,
  allTodosByUser,
  insert,
  item,
  update,
  remove,
  getTagsByTodoId,
};
