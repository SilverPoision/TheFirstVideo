const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongo = require("mongoose");
var cookieParser = require("cookie-parser");
dotenv.config();

const routes = require("./Routes/routes");
const { sendErrorDev, sendErrorProd } = require("./Utils/error_handling");
const PORT = process.env.PORT || 1337;

mongo.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB");
  }
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(routes);
app.use((_, res) => {
  return res.status(404).send("404 You are on a wrong way!!");
});

//Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  mode = "development";

  if (mode === "development") {
    sendErrorDev(err, res);
  } else if (mode === "production") {
    sendErrorProd(err, res);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${PORT}`);
});