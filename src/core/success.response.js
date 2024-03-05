'use strict';

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: 'OK',
  CREATED: 'CREATED',
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metaData = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metaData = metaData;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metaData }) {
    super({ message, metaData });
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metaData,
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metaData });
    this.options = options;
  }
}

module.exports = {
  SuccessResponse,
  Created,
  OK,
};
