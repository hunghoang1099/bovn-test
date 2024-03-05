'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');

router.get('/user', asyncHandler(UserController.getAllUser));
router.post('/user', asyncHandler(UserController.createNewUser));
router.put('/user/:id', asyncHandler(UserController.updateUser));
router.delete('/user/:id', asyncHandler(UserController.deleteUser));

module.exports = router;
