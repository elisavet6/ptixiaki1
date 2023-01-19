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

module.exports = router
