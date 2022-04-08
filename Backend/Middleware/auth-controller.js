const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { catchAsync, AppError } = require("../Controller/Misc/errorHandler");
const { tokenVerify, accessVerify } = require("../Utils/oauth_utils");

module.exports = catchAsync(async (req, res, next) => {
  const token = req.headers["authorization"];
  const access_token = req.headers["access-token"];

  if (
    (!token && !access_token) ||
    (token == undefined && access_token == undefined)
  ) {
    return next(new AppError("No token Provided", 400));
  }
  const googleUser = await tokenVerify(token);
  const googleUserAccess_token = await accessVerify(access_token);
  if (!googleUserAccess_token.status || !googleUser.status) {
    return next(new AppError("Token Invalid!", 403));
  }

  const user = await User.findOne({ email: googleUser.googleUser.email });

  if (!user) {
    return next(new AppError("No user found!!", 401));
  }

  if (user.sessToken.indexOf(token) >= 0) {
    req.user = user;
    return next();
  } else {
    return next(new AppError("Unauthorized", 401));
  }
});
