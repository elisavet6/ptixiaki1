const express = require('express');
const router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "mydb"
});
router.post('/login', async function (req, res, next) {  try {
  let { username, password } = req.body;
  const hashed_password = md5(password.toString())
  const sql = `SELECT * FROM users WHERE username = ? AND  password = ?`
  con.query(
    sql, [username, hashed_password],
    function(err, result, fields){
      if(result.length===0){
        res.send({ status: 0, data: err });
      }else{
        let token = jwt.sign({ data: result }, 'secret')
        res.send({ status: 1, data: result, token: token  });
      }
    })
} catch (error) {
  res.send({ status: 0, error: error });
}
});
module.exports = router
