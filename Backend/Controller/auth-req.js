const User = require("../Models/user");
const { catchAsync, AppError } = require("./Misc/errorHandler");
const { getGoogleOAuthToken, tokenVerify } = require("../Utils/oauth_utils");

exports.googleOauthHandler = catchAsync(async (req, res, next) => {
  //get the code from the qs
  const code = req.query.code;

  //get the id and access to  ken wit tthe ocde
  let { id_token, access_token } = await getGoogleOAuthToken(code);
  // console.log({ id_token, access_token });
  let { googleUser } = await tokenVerify(id_token);

  let user = await User.findOne({ email: googleUser.email });
  if (!user) {
    user = new User({
      email: googleUser.email,
      name: googleUser.name,
      photo_url: googleUser.picture,
    });
  }
  let token = id_token;

  user.sessToken.push(token);
  const filtered = [];
  await Promise.all(
    user.sessToken.map(async (el) => {
      try {
        let { status } = await tokenVerify(el);
        if (status) {
          filtered.push(el);
        }
      } catch (err) {}
    })
  );
  user.sessToken = filtered;
  user.save();
  return res
    .cookie("session", token, {
      maxAge: 900000,
      httpOnly: true,
    })
    .cookie("access_token", access_token, {
      maxAge: 900000,
      httpOnly: true,
    })
    .redirect("http://localhost:1337/dashboard");
});
