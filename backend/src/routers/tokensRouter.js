const express = require("express");
const router = express.Router();


router.get("/new-access-jwt", (req, res, next) => {

const {authorization} = req.headers
return res.json({ message: authorization });
});

module.exports = router;
