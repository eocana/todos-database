const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./todos.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  console.error(err);
});


function asyncTodosByUserId(id) { 
console.log("🚀 ~ file: todos.dao.js:11 ~ asyncTodosByUserId ~ id:", id)

  return new Promise((resolve, reject) =>{

    const sql = "select * from todos WHERE id_user = ?";
    console.log(sql);
    const params = [id];
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  })
}


function asyncAll(){
  return new Promise((resolve, reject) =>{

    const sql = "select * from todos";
    console.log(sql);
    const params = [];
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        // res.status(400).json({ error: err.message });
        // return;
        
        reject(err);

        return;
      }

      resolve(rows.map((row) => ({ ...row, todo: row.todo, done: Boolean(row.done) })));
      // console.log(rows);
      // res.json(
      //   rows.map((row) => ({ ...row, todo: row.todo, done: Boolean(row.done) }))
      // );
    });
  })
}


function asyncRemove(id) {
  return new Promise((resolve, reject) => {
    
    const sql = "DELETE FROM todos WHERE ID = ?";
    const params = [id];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    })

  })
}

function asyncInsert(todo, done) {
  
  return new Promise((resolve, reject) => {
    
    const sql = "INSERT INTO todos (todo, done) VALUES (?, ?)";
    const params = [todo, done];
    db.run(sql, params, function (err) {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })

  
  })
}


function asyncUpdate(id, todo, done) {
  return new Promise((resolve, reject) => {

    done ? 1 : 0;
    
    const sql = "UPDATE todos SET todo = ?, done = ? WHERE ID = ? ";
    const params = [todo, done, id];

    db.run(sql, params, function (err) {
      if (err) {
        return reject(err);
      }
      resolve();
    })

  })
}


function asyncItem(id){
  return new Promise((resolve, reject) =>{

    const sql = "select * from todos WHERE id = ? ";
    console.log(sql);
    const params = [id];
    
    db.all(sql, params, (err, rows) => {
      if (err) {
        // res.status(400).json({ error: err.message });
        // return;
        
        reject(err);

        return;
      }

      resolve(rows.map((row) => ({ ...row, todo: row.todo, done: Boolean(row.done) })));
      // console.log(rows);
      // res.json(
      //   rows.map((row) => ({ ...row, todo: row.todo, done: Boolean(row.done) }))
      // );
    });
  })
}

module.exports = {
  asyncAll,
  asyncRemove,
  asyncInsert,
  asyncUpdate,
  asyncItem,
  asyncTodosByUserId,
  };
