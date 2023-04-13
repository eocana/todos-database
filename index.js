const express = require("express");

const cors = require("cors");

const bcrypt = require('bcrypt');

require('dotenv').config()


const app = express();
const port = 3000;



app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/users.router.js");

app.use("/users", usersRouter);

// app.all("*", (req, res) => {
//   res.status(404).json({ error: "esta no es la página que estabas buscando" });
// });

//login
app.post("/login", (req, res, next) => {
  
const bcrypt = require('bcrypt');

  const { username, password } = req.body;
  const userDAO = require("./daos/users.dao.js");
  const user = userDAO.getByUsername(username);

  if (!user) { return next("Usuario no encontrado"); }
  
  if (bcrypt.compareSync(password, user.password)) { 
        //generar token
        var jwt = require('jsonwebtoken');
    var token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        exp: new Date()/1000 +10,
      },
      'secret_not_to_be_shared');

        return res.status(200).json({ token: token });


  } else {
    return next("Contraseña incorrecta");
  }

});
// registrar usuario
app.post("/register", (req, res, next) => { 
  const { username, password, name, email } = req.body;
  const saltRounds = 10;

  if (!username || !password || !name || !email) { 
    return res.status(400).json({ error: "Faltan campos, escribre todos lo campos necesarios" });
  } else {
    
    const myPlaintextPassword = password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          // Store hash in your password DB.
        const userDAO = require("./daos/users.dao.js");
        userDAO.insert({ username, password: hash, name, email });
        return res.json({ message: "Usuario registrado" });
      });
    });
  } 
})

// modificar usuario
app.put("/users/:id", (req, res, next) => { 
   
})

// endpoint privado de users/:ID


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`http://localhost:${port}/todos`);
});
