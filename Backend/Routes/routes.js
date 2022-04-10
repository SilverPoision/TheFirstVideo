const express = require("express");
const router = express.Router();

const authController = require("../Middleware/auth-controller");

const {
  googleOauthHandler,
  logout,
  setPriority,
  deletePriority,
} = require("../Controller/auth-req");

router.get("/api/sessions/oauth/google", (req, res, next) =>
  googleOauthHandler(req, res, next)
);
router.get("/authenticate", authController, (req, res, next) => {
  res.json({
    success: true,
    user: {
      email: req.user.email,
      name: req.user.name,
      url: req.user.photo_url,
    },
  });
});
router.get("/logout", authController, logout);

router.post("/priority", authController, setPriority);

router.delete("/priority", authController, deletePriority);

module.exports = router;
