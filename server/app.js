//ayto einai to framework gia to backend
const express = require('express');
//edo einai ta routes tou backend - diladi ta URLs sta opoia  exoume POST, GET methodous
const indexRouter = require('./routes/index');
// Cross-origin resource sharing (CORS) - enas mixanismos pou  automata diaxeirizetai prosbasi
const cors = require('cors');
//arxikopoiisi tis klasis
const app = express();
//tou leme na xrisimopoiei to cors
app.use(cors())
// tou leme na xrisimopoiei json tou express gia tin antalagi arxeion
app.use(express.json());
//tou leme poio einai to arxiko URL
app.use('/', indexRouter);
//tou leme se poia thira na akouei gia requests
app.listen(4000, () => {
  //print sto console
  console.log('listening on port 4000');
})
