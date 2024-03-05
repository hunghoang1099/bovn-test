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

  updateUser = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update user successfully',
      metaData: await UserService.updateUser({
        id: req.params.id,
        payload: req.body,
      }),
    }).send(res);
  };

  deleteUser = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete user successfully',
      metaData: await UserService.deleteUser({ id: req.params.id }),
    }).send(res);
  };
}

module.exports = new UserController();
