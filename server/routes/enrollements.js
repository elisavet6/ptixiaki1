const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "mydb"
});

router.post('/create', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {user_id, mathima_id} =req.body;

    const sql = `INSERT INTO enrollements (\`user_id\`, \`mathima_id\`) VALUES (?,?);`
    con.query(
      sql, [user_id, mathima_id],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data:result}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.post('/delete', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {user_id, mathima_id} =req.body;
    const sql = `DELETE  FROM enrollements WHERE user_id=? AND mathima_id=?`
    con.query(
      sql, [user_id, mathima_id],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data:req.body}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.post('/getmathimataofuser', async function (req, res, next) { //sunarthsh pou eksagei ta mathimata pou einai eggegramenos o foithths
  try {
    let {user_id} = req.body;
    const sql = `SELECT m.id, m.name, m.url, m.examino, m.description FROM enrollements as en, mathima as m WHERE en.mathima_id = m.id AND en.user_id = ?`
    con.query(
      sql, [user_id],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result});
        }

      })
  } catch (error) {
    res.send({status: 0, error: error});
  }
});

module.exports = router
