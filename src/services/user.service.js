'use strict';
const userModel = require('../models/user.model');
const { pickDataField } = require('../utils/index');
const {
  InternalServerErrorRequestResponse,
  BadRequestRequestErrorResponse,
  ForbiddenRequestErrorResponse,
  UnauthorizedRequestErrorResponse,
  NotFoundRequestErrorResponse,
} = require('../core/error.response');
const {
  findAllUsers,
  findUserByEmail,
  findUserById,
} = require('../models/repositories/user.repo');

class UserService {
  getAllUsers = async ({ query, limit = 50, skip = 0 }) => {
    return await findAllUsers({ query, limit, skip });
  };

  createUser = async (payload) => {
    const { name, email } = payload;
    const userExists = await findUserByEmail(email);
    if (userExists)
      throw new BadRequestRequestErrorResponse(`User ${email} already exists)`);

    const user = await userModel.create({ name, email });
    return pickDataField({
      fields: ['_id', 'name', 'email', 'verify'],
      object: user,
    });
  };

  updateUser = async ({ id, payload }) => {
    const foundUser = await findUserById(id);
    if (!foundUser)
      throw new BadRequestRequestErrorResponse(`User not exists)`);

    await foundShop.updateOne(foundShop);
  };
}

module.exports = new UserService();
