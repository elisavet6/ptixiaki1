const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { makeDb } = require('mysql-async-simple');
const fs=require("fs");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "mydb"
});
const db = makeDb();
router.post('/getall', async function (req, res, next) {
  try {
    const sql = `SELECT * FROM videos`
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

let video_list = [];
router.post('/getallvideofull', async function (req, res, next) {
  try {
    const db = makeDb();

    try {
      video_list = await db.query(con, `SELECT * FROM video`);
      for (let index = 0; index < video_list.length; index++) {
        let temp_video;
        let mathima = await db.query(con, `SELECT  * FROM mathima WHERE id = ` + video_list[index].to_mathima)
        temp_video = video_list[index];
        temp_video.mathima = mathima[0];
        Object.assign(video_list[index], temp_video);
        let user = await db.query(con, `SELECT  * FROM users WHERE id = ` + video_list[index].created_by)
        temp_video = video_list[index];
        temp_video.user = user[0];
        Object.assign(video_list[index], temp_video);
        let rates = await db.query(con, `SELECT  * FROM videorating WHERE video_id = ` + video_list[index].id)
        temp_video = video_list[index];
        temp_video.rates = rates;
        Object.assign(video_list[index], temp_video);
      }
      res.send({status: 1, data: video_list});
    } catch (e) {
      res.send({status: 0, error: error});
    }

  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.post('/getallvideosofmathima', async function (req, res, next) {
  try {
    const db = makeDb();
    let {to_mathima} = req.body;
    try {
      video_list = await db.query(con, `SELECT * FROM video WHERE to_mathima= ?`);
      for (let index = 0; index < video_list.length; index++) {
        let temp_video;
        let mathima = await db.query(con, `SELECT  * FROM mathima WHERE id = ` + video_list[index].to_mathima)
        temp_video = video_list[index];
        temp_video.mathima = mathima[0];
        Object.assign(video_list[index], temp_video);
        let user = await db.query(con, `SELECT  * FROM users WHERE id = ` + video_list[index].created_by)
        temp_video = video_list[index];
        temp_video.user = user[0];
        Object.assign(video_list[index], temp_video);
        let rates = await db.query(con, `SELECT  * FROM videorating WHERE video_id = ` + video_list[index].id)
        temp_video = video_list[index];
        temp_video.rates = rates;
        Object.assign(video_list[index], temp_video);
      }
      res.send({status: 1, data: video_list});
    } catch (e) {
      res.send({status: 0, error: error});
    }

  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.get('/playvideo', async function (req, res, next) {

  const decodedname = req.query.decodedname;
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }
  const videoPath = './videofiles/'+decodedname;
  const videoSize = fs.statSync(videoPath).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
})

router.post('/ratevideo', async function (req, res, next) {
  try {
 console.log(req.body);
    let {user_id, video_id, rank} = req.body;

    const sql = `INSERT INTO videorating (\`user_id\`, \`video_id\`, \`rank\`) VALUES (?,?,?);`

    con.query(
      sql, [user_id, video_id, rank],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result});
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

router.post('/deletevideorating', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {video_id} =req.body;
    const sql = `DELETE  FROM videorating WHERE video_id=?`
    con.query(
      sql, [video_id],
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
router.post('/deletevideo', async function (req, res, next) {
  try { //prospathise na ektleseis to parakatw kwdika  an uparxei lathos na mhn kleisei to programma alla na steilei ena error
    let {video_id} =req.body; // το πεδίου json που στέλνει το Frontend
    const sql = `DELETE  FROM video WHERE id=?` //το πεδίο στο sql
    con.query(
      sql, [video_id],
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

router.post('/uploadyoutubevideo', async function (req, res, next) {
  try {
    console.log(req.body);
    let {video_name,to_mathima,user_id, youtube_url} = req.body;

    const sql = `INSERT INTO video (\`originalname\`, \`to_mathima\`, \`created_by\`,\`youtube_url\`) VALUES (?,?,?,?);`

    con.query(
      sql, [video_name, to_mathima, user_id, youtube_url],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result});
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});
const multer= require('multer'); //βιβλιοθήκη που μας επιτρέπει να αλληλεπιδράμε με τοπικό σύστημα
const saveFunction = multer({dest:'./videofiles/'})

router.post('/uploadvideo', saveFunction.single('file'), async function (req, res, next) {
  try {
    console.log(req.body);
    let {to_mathima,video_name,user_id} = req.body;
    let decodedname = req.file.filename;
    const sql = `INSERT INTO video (\`originalname\`, \`decodedname\`, \`to_mathima\`, \`created_by\`) VALUES (?,?,?,?);`

    con.query(
      sql, [video_name,decodedname, to_mathima, user_id],
      function (err, result) {
        if (err) {
          res.send({status: 0, data: err});
        } else {
          res.send({status: 1, data: result});
        }
      })
  } catch (error) { //
    res.send({status: 0, error: error});
  }
});

module.exports = router
