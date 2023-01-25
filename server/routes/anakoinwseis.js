const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { makeDb } = require('mysql-async-simple');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "mydb"
});
const db = makeDb();
router.post('/getall', async function (req, res, next) {
  try {
    const sql = `SELECT * FROM anakoinoseis`
    con.query(
      sql, [],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});
let anakoinoseis = [];
router.post('/getallanakoinoseisfull', async function (req, res, next) {
  try {
    const db = makeDb();

    try {
      anakoinoseis = await db.query(con, `SELECT * FROM anakoinoseis`);
      for (let index = 0; index < anakoinoseis.length; index++) {
        let temp_anakoinosi;
        let mathima = await db.query(con, `SELECT  * FROM mathima WHERE id = ` + anakoinoseis[index].to_mathima)
        temp_anakoinosi = anakoinoseis[index];
        temp_anakoinosi.mathima = mathima[0];
        Object.assign(anakoinoseis[index], temp_anakoinosi);
        let user = await db.query(con, `SELECT  * FROM users WHERE id = ` + anakoinoseis[index].created_by)
        temp_anakoinosi = anakoinoseis[index];
        temp_anakoinosi.user = user[0];
        Object.assign(anakoinoseis[index], temp_anakoinosi);
      }
      res.send({status: 1, data: anakoinoseis});
    } catch (e) {
      res.send({status: 0, error: error});
    }

  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

module.exports = router
