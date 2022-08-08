const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
})();


// const setJWT = (key, value) => {
//   console.log(key, value)
//     try {
//       return client.set(key, value);
//     } catch (error) {
//       console.log(error);
//     }
// };

// const getJWT = async (key) => {
//     try {
//       await client.get(key, (error, data) => {
//         if (error) throw(error);
//         return data
//       });
//     } catch (error) {
//       console.log(error)
//       return(error);
//     }
// };

module.exports = { client };
