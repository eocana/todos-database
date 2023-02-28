// const data = [
//   {
//     id: 1,
//     text: "hola",
//     done: true,
//   },
//   {
//     id: 2,
//     text: "adios",
//     done: false,
//   },
// ];

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
// new promise syntax:
// function all(req, res) {
//  console.log(asyncAll());
//  asyncAll()
//   .then((rows) =>{
//     res.json(rows);
//   })
//   .catch((err) =>{
//     res.status(500).json({error: err});
//   })
// }

//new async/await sintax
async function all(req, res){
  try{
    const rows = await asyncAll();
    res.json(rows)
   
  } catch(ex){
    res.status(500).json({error: err});
  }
  
}

function item() {
  return;
}

function insert(req, res) {
  var sql = `INSERT INTO todos (todo, done) VALUES ( '${req.body.text}' , false);`;
  console.log(sql);

  var params = [];

  db.run(sql, params, function (err) {
    console.log(this);
    console.log(err);
    if (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      id: this.lastID,
      text: req.body.text,
      done: false,
    });
  });
}

function update() {
  return;
}

function remove() {
  return;
}

module.exports = {
  all,
  item,
  insert,
  update,
  remove,
};
