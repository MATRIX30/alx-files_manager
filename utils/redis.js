/**
 * contains redis class to manage redis operations
 * get, set and del
 */
const redis = require('redis'); // importing redis

class RedisClient {
  constructor() {
    this.redis_client = redis.createClient();
    this.redis_client.on('error', (err) => {
      console.log(`Redis Error occured ${err}`);
    });
  }

  isAlive() {
    return this.redis_client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.redis_client.get(key, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.redis_client.setex(key, duration, value, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.redis_client.get(key, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
