//const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./todos.sqlite";

const betterSqlite3 = require('better-sqlite3');

const bd = betterSqlite3(DBSOURCE);



function asyncAll() { 
  const stm = bd.prepare('SELECT * FROM todos')
  const rows = stm.all();

  return rows;
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


module.exports = {
  asyncAll,
  asyncRemove,
  asyncUpdate,
  // insert,
  // item,
  // update
  // asyncUpdate,
  };


/*

const db = new sqlite3.Database(DBSOURCE, (err) => {
  console.error(err);
});

function asyncAll(){
  return new Promise((resolve, reject) =>{

    const sql = "select * from todos";
    console.log(sql);
    const params = [];
    console.log("hola");
    db.all(sql, params, (err, rows) => {
      if (err) {
        // res.status(400).json({ error: err.message });
        // return;
        
        reject(err);
        return;
      }

      resolve(rows.map((row) => ({ ...row, text: row.todo, done: Boolean(row.done) })));
      // console.log(rows);
      // res.json(
      //   rows.map((row) => ({ ...row, text: row.todo, done: Boolean(row.done) }))
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

module.exports = {
  asyncAll,
  asyncRemove,
  // asyncInsert,
  // asyncUpdate,
  };
*/