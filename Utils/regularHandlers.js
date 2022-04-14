async function manageChannelPriority(
  channel,
  users_channel,
  priority,
  Channel
) {
  if (channel.channel_priority < priority) {
    users_channel.map((el) => {
      if (el.channel_name == channel.channel_name) {
        el.channel_priority = priority;
      }
    });

    users_channel.map((el) => {
      if (
        el.channel_priority > channel.channel_priority &&
        el.channel_priority <= priority &&
        el.channel_name != channel.channel_name
      ) {
        el.channel_priority = el.channel_priority - 1;
      }
    });
    users_channel.sort((a, b) => {
      return a.channel_priority - b.channel_priority;
    });

    Channel.collection.insertMany(users_channel);
  } else {
    users_channel.map((el) => {
      if (el.channel_name == channel.channel_name) {
        el.channel_priority = priority;
      }
    });

    users_channel.map((el) => {
      if (
        el.channel_priority < channel.channel_priority &&
        el.channel_priority >= priority &&
        el.channel_name != channel.channel_name
      ) {
        el.channel_priority = el.channel_priority + 1;
      }
    });

    users_channel.sort((a, b) => {
      return a.channel_priority - b.channel_priority;
    });

    Channel.collection.insertMany(users_channel);
  }
}

exports.manageChannelPriority = manageChannelPriority;
