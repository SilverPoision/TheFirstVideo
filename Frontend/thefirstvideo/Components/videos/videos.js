import { useEffect } from "react";

import VideosCard from "./videos-card";
import { fetchChannels, fetchVideos } from "../../utils/regular_helpers";

export default function Videos() {
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchChannels();
      console.log(data.channel);
      let res = await fetchVideos(data.channel);
    };
    fetchData();
  }, []);
  return <VideosCard />;
}
