const mongo = require("mongoose");

const userSchema = new mongo.Schema(
  {
    email: {
      type: String,
      required: true,
      min: 6,
      max: 200,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    sessToken: [
      {
        type: String,
      },
    ],
    photo_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongo.model("User", userSchema);
