const express = require('express'); //fix
const router = express.Router(); //fix


const user = require('./user'); //dhmiourgia url
router.use('/user', user);


module.exports = router; //fix
