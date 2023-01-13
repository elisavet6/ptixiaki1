const express = require('express'); //fix
const router = express.Router(); //fix


const user = require('./user'); //dhmiourgia url
router.use('/user', user);

const mathima = require('./mathima'); //dhmiourgia url
router.use('/mathima', mathima);

const enrollements = require('./enrollements'); //dhmiourgia url
router.use('/enrollements', enrollements);


module.exports = router; //fix
