import SubCard from "./subscriber-card";
import { fetchSubs } from "../../utils/regular_helpers";
import classes from "./subscriber.module.css";
import { useAuthUpdate } from "../../contexts/auth";

import { useState, useEffect } from "react";

export default function Subscribers(props) {
  // const [sub, setSub] = useState([]);
  // const updateAuth = useAuthUpdate();
  // if (props.data) {
  //   setSub([...props.data.items]);
  // }
  // useEffect(() => {
  //   const fetch = async () => {
  //     const subs = await fetchSubs();
  //     if (subs == false) {
  //       updateAuth();
  //     }
  //     setSub([...subs.items]);
  //   };
  //   fetch();
  // }, []);
  return (
    <div className={classes.container}>
      <h2>Your top 50 Subscriptions</h2>
      {props.data.items.map((el) => {
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
