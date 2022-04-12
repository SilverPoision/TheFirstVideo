import SubCard from "./subscriber-card";
import { fetchSubs } from "../../utils/regular_helpers";
import classes from "./subscriber.module.css";

import { useState, useEffect } from "react";

export default function Subscribers() {
  const [sub, setSub] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const subs = await fetchSubs();
      setSub([...subs.items]);
    };
    fetch();
  }, []);
  return (
    <div className={classes.container}>
      <h2>Your top 50 Subscriptions</h2>
      {sub.map((el) => {
        return (
          <SubCard
            key={el.snippet.resourceId.channelId}
            id={el.snippet.resourceId.channelId}
            name={el.snippet.title}
            image={el.snippet.thumbnails.default.url}
          />
        );
      })}
    </div>
  );
}
