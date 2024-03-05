'use strict';

const express = require('express');
const router = express.Router();
// const { pushLogToToDiscord } = require('../middlewares/index');

//push log to Discord
// router.use(pushLogToToDiscord);

router.use('/api/v1', require('./user/index'));

module.exports = router;
