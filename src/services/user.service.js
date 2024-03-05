'use strict';
const userModel = require('../models/user.model');
const { pickDataField } = require('../utils/index');
const {
  BadRequestRequestErrorResponse,
  NotFoundRequestErrorResponse,
} = require('../core/error.response');
const {
  findAllUsers,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
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
    if (!foundUser) throw new NotFoundRequestErrorResponse(`User not exists)`);

    return await findUserByIdAndUpdate({ user_id: id, payload, isNew: false });
  };

  deleteUser = async ({ id }) => {
    const foundUser = await findUserById(id);
    if (!foundUser) throw new NotFoundRequestErrorResponse(`User not exists)`);

    return await findUserByIdAndDelete({ user_id: id });
  };
}

module.exports = new UserService();
