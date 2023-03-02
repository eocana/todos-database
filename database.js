const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "./todos.sqlite";

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
