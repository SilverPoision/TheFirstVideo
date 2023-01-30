const axios = require("axios");
const qs = require("qs");
const { catchAsync, AppError } = require("../Controller/Misc/errorHandler");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function getGoogleOAuthToken(code) {
  const url = "https://accounts.google.com/o/oauth2/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(url, qs.stringify(values), {
      Headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function tokenVerify(id_token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return { status: true, googleUser: payload };
  } catch (err) {
    if (err) {
      return { status: false };
    }
  }
}

async function accessVerify(access_token) {
  try {
    const req = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${access_token}`
    );

    if (req.error) {
      return { status: false };
    }
    return { status: true };
  } catch (err) {
    return { status: false };
  }
}

exports.getGoogleOAuthToken = getGoogleOAuthToken;
exports.tokenVerify = tokenVerify;
exports.accessVerify = accessVerify;

// exports.getGoogleUser = async (id_token, access_token) => {
//   const res = await axios.get(
//     `https://www.googleapis.com/oauth2/v1/userinfo?alt-json&access_token=${access_token}`,
//     {
//       Headers: {
//         Authorization: `Bearer ${id_token}`,
//       },
//     }
//   );

//   return res.data;
// };s
