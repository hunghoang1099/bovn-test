'use strict';
const { model, Schema, Types } = require('mongoose');

const COLLECTION_NAME = 'Users';
const DOCUMENT_NAME = 'User';

// Declare the Schema of the Mongo model
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxLength: 150,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
