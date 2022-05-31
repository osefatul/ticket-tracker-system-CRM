const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const userRouter = require("./src/routers/userRouter");
const ticketRouter = require("./src/routers/ticketRouter");
const handleError = require("./src/utils/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

//Connect to MONGODB
mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

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

//HOW TO HANDLE ERROR IF NONE OF THE ABOVE ROUTERS ARE REQUESTED.
//1.CREATE AN ERROR MESSAGE
app.use((req, res, next) => {
  const error = new Error("Resources Not Found");
  error.status = 404; // not found error status number
  next(error); //pass error to next router.
});

//2.PASS ERROR MESSAGE TO ERROR HANDLER
app.use((error, req, res, next) => {
  handleError(error, res);
});

//TEST GET REQUEST
app.use("/", (req, res) => {
  res.json("Hi There");
});

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});
