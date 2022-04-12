import ManageCard from "./manage-card";
import classes from "./manage.module.css";
import {
  fetchChannels,
  changePriorities,
  deleteChannel,
} from "../../utils/regular_helpers";

import { useEffect, useState } from "react";
import AddChannel from "./add-channel";

export default function Manage() {
  const [channels, setChannels] = useState([]);

  async function priorityHandler(priority, name, action) {
    if (!priority || priority <= 0) {
      return;
    }
    const data = await changePriorities(priority, name, action);
    if (data.success) {
      const data = await fetchChannels();
      setChannels(data.channel);
    }
  }

  async function deleteHandler(id) {
    const data = await deleteChannel(id);
    if (data.success) {
      const data = await fetchChannels();
      setChannels(data.channel);
    }
  }

  async function addChannelHandler(name, priority) {
    const data = await changePriorities(priority, name);
    if (data.success) {
      const data = await fetchChannels();
      setChannels(data.channel);
    }
  }

  useEffect(() => {
    const fetchCha = async () => {
      const data = await fetchChannels();
      setChannels(data.channel);
    };
    fetchCha();
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.heading}>You Channels and Priorities</h2>
      <AddChannel addChan={addChannelHandler} />
      {channels.map((el) => {
        return (
          <ManageCard
            key={el._id}
            priority={el.channel_priority}
            id={el._id}
            name={el.channel_name}
            priorityHandler={priorityHandler}
            deleteChannel={deleteHandler}
          />
        );
      })}
    </div>
  );
}
