const {asyncAll, asyncRemove} = require('./database.js');

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
//   var sql = `INSERT INTO todos (todo, done) VALUES ( '${req.body.text}' , false);`;
//   console.log(sql);

//   var params = [];

//   db.run(sql, params, function (err) {
//     console.log(this);
//     console.log(err);
//     if (err) {
//       console.log(err);
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       id: this.lastID,
//       text: req.body.text,
//       done: false,
//     });
//   });
}

function update(req, res) {
  return;
}

async function remove(req, res) {
  try {
    await asyncRemove(req.params.id);
    res.status(200).json({});
  } catch (ex) { 
  
     res.status(500).json({ error: ex.message });
  }


  return;
}

module.exports = {
  all,
  item,
  insert,
  update,
  remove,
};
