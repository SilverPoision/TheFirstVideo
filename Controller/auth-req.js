const User = require("../Models/user");
const Channel = require("../Models/channels");
const axios = require("axios");
const { catchAsync, AppError } = require("./Misc/errorHandler");
const { getGoogleOAuthToken, tokenVerify } = require("../Utils/oauth_utils");
const { manageChannelPriority } = require("../Utils/regularHandlers");
const { channelSchema, deletePrioritySchema } = require("../Models/validate");

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
      maxAge: 43200000,
      domain: "herokuapp.com",
    })
    .cookie("access_token", access_token, {
      maxAge: 43200000,
      domain: "herokuapp.com",
    })
    .redirect("https://thefirstvideoc.herokuapp.com/");
});

exports.logout = catchAsync(async (req, res, next) => {
  const session = req.headers["authorization"];
  let user = req.user;
  filtered = [];
  user.sessToken.map((el) => {
    if (el != session) {
      filtered.push(el);
    }
  });
  user.sessToken = filtered;
  user.save();
  res.status(200).send({ success: true, error: false, message: "Logout done" });
});

exports.setPriority = catchAsync(async (req, res, next) => {
  const { error } = channelSchema(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const name = req.body.name;
  let priority = req.body.priority;
  const token = req.headers["access-token"];

  const existingChannel = await Channel.findOne({
    channel_priority: priority,
    user: req.user._id,
  });

  let channel1 = await Channel.findOne({
    channel_name: name,
    user: req.user._id,
  });

  if (existingChannel != channel1) {
    if (existingChannel && !channel1) {
      const url = `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=snippet&type=channel&maxResults=1&q=${name}`;
      const data = await axios.get(url);
      const id = data.data.items[0].id.channelId;
      const cha = {
        user: req.user._id,
        channel_name: name,
        channel_id: id,
        channel_priority: 200,
      };
      const new_channel = new Channel({ ...cha });
      await new_channel.save();
    }

    const users_channel = await Channel.find({ user: req.user._id }).sort({
      channel_priority: 1,
    });

    channel1 = await Channel.findOne({
      channel_name: name,
      user: req.user._id,
    });

    await Channel.deleteMany({
      user: req.user._id,
    }).sort({
      channel_priority: 1,
    }); //do this with aggregrate funtions in mongodb

    await manageChannelPriority(channel1, users_channel, priority, Channel);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Channel Updated!",
    });
  }

  const channel = await Channel.findOne({
    channel_name: name,
    user: req.user._id,
  });
  if (channel) {
    const users_channel = await Channel.find({ user: req.user._id }).sort({
      channel_priority: 1,
    });

    await Channel.deleteMany({
      user: req.user._id,
    }).sort({
      channel_priority: 1,
    });

    await manageChannelPriority(channel, users_channel, priority, Channel);

    return res.status(200).json({
      success: true,
      error: false,
      message: "Channel Updated!",
    });
  } else {
    const url = `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=snippet&type=channel&maxResults=1&q=${name}`;
    const data = await axios.get(url);
    const id = data.data.items[0].id.channelId;
    const cha = {
      user: req.user._id,
      channel_name: name,
      channel_id: id,
      channel_priority: priority,
    };
    const new_channel = new Channel({ ...cha });
    new_channel.save();
    res.status(201).json({
      success: true,
      error: false,
      message: "Channel Created!",
    });
  }
});

exports.deletePriority = catchAsync(async (req, res, next) => {
  const { error } = deletePrioritySchema(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  const id = req.body.id;
  let channel = await Channel.deleteOne({
    _id: id,
    user: req.user._id,
  });

  if (channel.deletedCount <= 0) {
    return res.status(200).json({
      success: false,
      error: true,
      message: "No channel found!",
    });
  }

  channel = await Channel.find({ user: req.user._id }).sort({
    channel_priority: 1,
  });

  await Channel.deleteMany({ user: req.user._id });

  let index = 0;

  channel.map((el, i) => {
    el.channel_priority = i + 1;
    index = i + 1;
  });

  if (index >= 1) {
    await Channel.collection.insertMany(channel);
  } else {
    await Channel.collection.insertOne({ ...channel[0] });
  }

  return res.status(200).json({
    success: true,
    error: false,
    message: "Deleted Channel",
  });
});

exports.getPriorites = catchAsync(async (req, res, next) => {
  const channel = await Channel.find(
    {
      user: req.user._id,
    },
    { _id: 1, channel_name: 1, channel_priority: 1, channel_id: 1 }
  );
  if (!channel) {
    return res.status(200).json({
      success: false,
      error: true,
      message: "No channels found!",
    });
  }
  return res.status(200).json({
    success: true,
    error: false,
    channel,
  });
});
