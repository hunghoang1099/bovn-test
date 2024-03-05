'use strict';
const redis = require('redis');

class RedisDatabase {
  constructor() {
    this.connect();
  }

  async connect() {
    const client = redis.createClient({
      host: 'localhost',
      port: 6379,
    });

    client.connect();

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    client.on('error', (err) => {
      console.error(`Error connecting to Redis: ${err}`);
    });
  }

  static getInstance() {
    if (!RedisDatabase.instance) {
      RedisDatabase.instance = new RedisDatabase();
    }

    return RedisDatabase.instance;
  }
}

const instanceRedisDb = RedisDatabase.getInstance();
module.exports = instanceRedisDb;
