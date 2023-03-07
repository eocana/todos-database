const {asyncAll, asyncRemove, asyncInsert, asyncUpdate, asyncItem} = require('./database.js');

//new async/await sintax
async function all(req, res){
  try{
    const rows = await asyncAll();
    res.json(rows)
   
  } catch(ex){
    res.status(500).json({error: err});
  }
  
}

async function item(req, res) {
  try {
    const row = await asyncItem(req.params.id);
    res.json(row)
  } catch (ex) {
    res.status(500).json({error: ex.message});
   }
  return;
}

async function insert(req, res) {
  try {
    
    const { text, done } = req.body;
    
    await asyncInsert(text, done);
    
    res.status(200).json({})

  } catch (ex) {
    res.status(500).json({error: ex.message});
   }

}

async function update(req, res) {
  try {
    const id = req.params.id;
    const {text, done} = req.body;
    await asyncUpdate(id, text ,done);
   } catch (ex) {
    res.status(500).json({error: ex.message});
  }
  return;
}

async function remove(req, res) {
  try {
    await asyncRemove(req.params.id);
    res.status(200).json({})
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
