const express = require("express");
const router = express.Router();

const authController = require("../Middleware/auth-controller");

const { googleOauthHandler } = require("../Controller/auth-req");

router.get("/api/sessions/oauth/google", (req, res, next) =>
  googleOauthHandler(req, res, next)
);

router.get("/dashboard", authController, (req, res, next) => {
  res.send({
    success: true,
    name: req.user.name,
  });
});

module.exports = router;
