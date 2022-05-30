const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./src/routers/userRouter");
const ticketRouter = require("./src/routers/ticketRouter");

const app = express();
const port = process.env.PORT || 5000;

//API security
app.use(helmet());

//handle CORS error
app.use(cors());

//Logger
app.use(morgan("combined"));

// Set body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Everytime a request is coming to this path, redirect it to userRouter.
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

// If we enter wrong router
app.use("*", (req, res) => {
  res.json({ message: "Resources not found !" });
});

//
app.use("/", (req, res) => {
  res.json("Hi There");
});

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
