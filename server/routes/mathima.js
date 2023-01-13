const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "mydb"
});

router.post('/getall', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    const sql = `SELECT * FROM mathima`
    con.query(
      sql, [],
      function (err, result) {
        if (result.length === 0) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.post('/getmathimabyid', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
   let { id }=req.body;
    const sql = `SELECT * FROM mathima WHERE id=?`
    con.query(
      sql, [id], //stis aggiles mpainei auto pou thelo
      function (err, result) {
        if (result.length === 0) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

module.exports = router
