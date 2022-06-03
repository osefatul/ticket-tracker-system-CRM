const redis = require("redis");
// const client = redis.createClient();
// await client.connect();
// client.on("error", (err) => console.log("Redis Client Error", err));
const client = redis.createClient();

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();
})();

const setJWT = (key, value) => {
  console.log(key, value);
  return new Promise((resolve, reject) => {
    try {
      return client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  // console.log("getJWT", key);
  return new Promise((resolve, reject) => {
    try {
      return client.get("key", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { setJWT, getJWT };
