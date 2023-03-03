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

router.post('/login', async function (req, res, next) {
  try {
    let {username, password} = req.body;
    const hashed_password = md5(password.toString())
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    con.query(
      sql, [username, hashed_password],
      function (err, result) {
        if (result.length === 0) {
          res.send({status: 0, data: err});
        } else {
          let token = jwt.sign({data: result}, 'secret')
          res.send({status: 1, data: result, token: token});
        }

      })
  } catch (error) {
    res.send({status: 0, error: error});
  }
});

router.post('/update', async function (req, res, next) {
  try {
    let {id, username, password, fullName, role} = req.body;
    const hashed_password = md5(password.toString())
    const sql = `UPDATE users SET fullName = ?, password = ? WHERE username = ?`
    con.query(
      sql, [fullName, hashed_password, username],
      function (err, result, fields) {
        if (result.length === 0) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: [req.body]}); //stelnoume pisw ta anavathmismena stoixeia
        }
      })
  } catch (error) {
    res.send({status: 0, error: error});
  }
});

router.post('/getall', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    const sql = `SELECT * FROM users`
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

router.post('/delete', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {username} =req.body;
    const sql = `DELETE  FROM users WHERE username=?`
    con.query(
      sql, [username],
      function (err) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data:req.body});
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});


router.post('/create', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {id,username,password,fullName,role} =req.body;
    const hashed_password = md5(password.toString())
    const sql = `INSERT INTO users (\`id\`, \`username\`, \`password\`, \`fullName\`, \`role\`) VALUES (?,?,?,?,?);`
    con.query(
      sql, [id,username,hashed_password,fullName,role],
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

router.post('/getstudents', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let { role }=req.body;
    const sql = `SELECT * FROM users WHERE role='student'`
    con.query(
      sql, [role],
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

router.post('/getteachers', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let { role }=req.body;
    const sql = `SELECT * FROM users WHERE role='teacher'`
    con.query(
      sql, [role],
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

router.post('/getsecretary', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let { role }=req.body;
    const sql = `SELECT * FROM users WHERE role='secretary'`
    con.query(
      sql, [role],
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
