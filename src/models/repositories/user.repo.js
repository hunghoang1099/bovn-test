'use strict';
const user = require('../user.model');
const findAllUsers = async ({ query, limit, skip }) => {
  return await user
    .find(query)
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();
};

const createUser = async (payload) => {
  const user = new userModel(payload);
  return await user.save();
};

const findUserByEmail = async (email) => {
  return await user.findOne({ email }).lean();
};

const findUserById = async (id) => {
  return await user.findById(id).lean();
};
module.exports = { findAllUsers, findUserByEmail, findUserById };
