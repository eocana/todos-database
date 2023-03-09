//const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./todos.sqlite";

const betterSqlite3 = require('better-sqlite3');

const bd = betterSqlite3(DBSOURCE);



function asyncAll() { 
  const stm = bd.prepare('SELECT * FROM todos')
  const rows = stm.all();

  return rows;
}

function asyncItem(id) {

  const stm = bd.prepare("SELECT * FROM todos WHERE id = ?");
  const row = stm.get(id);
  console.log("🚀 ~ file: database.js:22 ~ asyncItem ~ row:", row)

  return row;
}

function asyncRemove(id) {

  const stm = bd.prepare("DELETE FROM todos WHERE id = ?");
  const row = stm.run(id);

  return row;
}


function asyncUpdate(id, done) {

  //done es boolean y SQLite3 can only bind numbers, strings, bigints, buffers, and null

  const intDone = (done) ? 1 : 0;

  const stm = bd.prepare("UPDATE todos SET done = ?  WHERE id = ? ");
  const row = stm.run(intDone, id);

  return row;
}

function asyncInsert(todo,done) {

  const stm = bd.prepare("INSERT INTO todos (todo, done) VALUES (?, ?)");
  const row = stm.run(todo, done);

  return row;
}


module.exports = {
  asyncAll,
  asyncRemove,
  asyncUpdate,
  asyncInsert,
  asyncItem,
  };