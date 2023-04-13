const DBSOURCE = "./todos.sqlite";

const betterSqlite3 = require("better-sqlite3");
const db = betterSqlite3(DBSOURCE);

function deletePassword(row) {
  delete row.password;
  return row;
}

function all() {
  const stm = db.prepare("SELECT * FROM users");
  const rows = stm.all();

  //eliminar el password de rows
  rows.map((row) => {
    deletePassword(row);
  });

  return rows;
}

function item(id) {
  const stm = db.prepare("SELECT * FROM users WHERE id = ?");
  const rows = stm.get(id);
  return deletePassword(rows);
}


function getByUsername(username) {
  const stm = db.prepare("SELECT * FROM users WHERE username = ?");
  const rows = stm.get(username);
  return rows;
}

function insert(data) {
  //
  const { username, password, name, email } = data;
  const stm = db.prepare("INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)");
  const row = stm.run(username, password, name, email);
  return row;
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

module.exports = {
  all,
  insert,
  item,
  update,
  remove,
  getByUsername,
};
