const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
})();




const setJWT = (key, value) => {
  console.log(key, value)
    try {
      return client.set(key, value);
    } catch (error) {
      console.log(error);
    }
};

const getJWT = (key) => {
  // console.log(key);
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { setJWT, getJWT, client };
