const {asyncAll, asyncRemove, asyncUpdate, asyncInsert, asyncItem} = require('./database.js');

//new async/await sintax
async function all(req, res){
  try{
    const rows = await asyncAll();
    res.json(rows)
   
  } catch(ex){
    res.status(500).json({error: ex.message});
  }
  
}

async function item(req,res) {
    try {
     const row = await asyncItem(req.params.id);
      console.log("🚀 ~ file: controller.js:18 ~ item ~ req.params.id:", req.params.id)
      res.status(200).json(row);
    } catch (ex) { 
      res.status(500).json({ error: ex.message });
      // res.status(404).json({ error: ex.message });
  }
  
  return;
}

async function insert(req, res) {
  const { todo, done } = req.body;
  try {
    const row = await asyncInsert(todo, done);
  } catch (ex) { 
    res.status(500).json({error: ex.message});
  }

  return;
}

async function update(req, res) {
  try {

    const {done}  = req.body;
    
    await asyncUpdate(req.params.id, done);
    res.status(200).json({});
  } catch (ex) { 
  
    res.status(500).json({ error: ex.message });
    // res.status(404).json({ error: ex.message });
  }


  return;

}

async function remove(req, res) {
  try {
    await asyncRemove(req.params.id);
    res.status(200).json({});
  } catch (ex) { 
  
    res.status(500).json({ error: ex.message });
    // res.status(404).json({ error: ex.message });
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
