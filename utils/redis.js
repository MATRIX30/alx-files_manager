/**
 * program to handle redis connections
 * contains the class redis
 */

const redis = require('redis'); // importing redis

class RedisClient {
  constructor() {
    this.redis_client = redis.createClient({
      host: 'localhost',
      port: 6379
    }); // creating a redis client
    this.redis_client.on('error', (err) => {
      console.log('Error occured in redis', err);
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
      this.redis_client.del(key, (err, response) => {
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
