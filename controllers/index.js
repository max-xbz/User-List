const express = require('express');
const router = express.Router();
//including get all / get one / delete / create / update
router.use('/api/users', require('./users'));
module.exports = router;