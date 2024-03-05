'use strict';
const userModel = require('../user.model');
const findAllUsers = async ({ query, limit, skip }) => {
  return await userModel
    .find(query)
    .sort({ updateAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();
};

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email }).lean();
};

const findUserById = async (id) => {
  return await userModel.findById(id).lean();
};

const findUserByIdAndUpdate = async ({ user_id, payload, isNew = true }) => {
  const result = await userModel.findByIdAndUpdate(user_id, payload, {
    new: isNew,
  });

  return result;
};

const findUserByIdAndDelete = async ({ user_id }) => {
  const result = await userModel.findByIdAndDelete(user_id);

  return result;
};
module.exports = {
  findAllUsers,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
};
