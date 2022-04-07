exports.sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    payload: {
      error: err,
      stack: err.stack,
    },
    error: {
      code: err.statusCode,
      message: err.message,
    },
  });
};

exports.sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: {
      code: err.statusCode,
      message: err.message,
    },
  });
};
