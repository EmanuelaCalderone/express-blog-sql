//importo il modulo mysql2 per connettere l'app al db MySQL
const mysql = require("mysql2");

//configuro la connessione al database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PassWord8!",
  database: "blog"
});

//mi connetto al db per verificare se ci sono errori
connection.connect((err) => {
  if (err) throw err;
  console.log("Connesso a MySQL");
});

//esporto la connessione per usarla negli altri file
module.exports = connection;
