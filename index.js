const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongo = require("mongoose");
const cors = require("cors");
var cookieParser = require("cookie-parser");
dotenv.config();

const routes = require("./Routes/routes");
const { sendErrorDev, sendErrorProd } = require("./Utils/error_handling");
const PORT = process.env.PORT || 1337;

mongo.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to DB");
  }
);

var corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors(corsOptions));

app.use(routes);
app.use((_, res) => {
  return res.status(404).send("404 You are on a wrong way!!");
});

//Error Handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  mode = process.env.NODE_ENV;

  if (mode === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${PORT}`);
});
