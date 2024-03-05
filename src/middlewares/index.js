'use strict';

const discordLogger = require('../loggers/discord.log');

const pushLogToToDiscord = async (req, res, next) => {
  try {
    discordLogger.sendToFormatCode({
      title: `Method: ${req.method}`,
      code: req.method === 'POST' ? req.body : req.query,
      message: `${req.get('host')} ${req.originalUrl}`,
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { pushLogToToDiscord };
