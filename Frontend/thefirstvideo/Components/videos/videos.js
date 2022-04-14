import { useEffect, useState } from "react";

import VideosCard from "./videos-card";
import classes from "./videos.module.css";
import { fetchChannels, fetchVideos } from "../../utils/regular_helpers";

export default function Videos() {
  const [videos, setVideos] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchChannels();
      let res = await fetchVideos(data.channel);
      setVideos(res);
    };
    fetchData();
  }, []);

  let vid = null;

  if (videos) {
    vid = Object.values(videos).map((el) => {
      return <VideosCard key={el.id} data={el} />;
    });
  }

  return <div className={classes.container}>{vid}</div>;
}
