const mongo = require("mongoose");

const channelSchema = new mongo.Schema(
  {
    user: {
      type: mongo.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel_name: {
      type: String,
      required: true,
    },
    channel_id: {
      type: String,
      required: true,
    },
    channel_priority: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongo.model("Channel", channelSchema);
