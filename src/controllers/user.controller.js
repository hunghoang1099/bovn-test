'use strict';
const { Created, SuccessResponse } = require('../core/success.response');
const UserService = require('../services/user.service');
class UserController {
  constructor() {}

  getAllUser = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get list user successfully',
      metaData: await UserService.getAllUsers(req.query),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  createNewUser = async (req, res, next) => {
    new Created({
      message: 'Create new user successfully',
      metaData: await UserService.createUser(req.body),
    }).send(res);
  };
}

module.exports = new UserController();
