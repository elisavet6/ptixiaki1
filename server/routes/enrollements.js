const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const md5 = require("md5");
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
        if (result.length === 0) {
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
        if (result.length === 0) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data:req.body}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

module.exports = router
