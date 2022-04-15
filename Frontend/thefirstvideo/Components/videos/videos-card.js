import classes from "./videos-card.module.css";

export default function VideosCard(props) {
  return (
    <div className={classes.container}>
      <a
        href={`https://www.youtube.com/watch?v=${props.data.resourceId.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <img src={props.data.thumbnails.medium.url} />
        </div>
      </a>
      <div className={classes.title}>
        <span>{props.data.title}</span>
        <a
          href={`https://www.youtube.com/channel/${props.data.videoOwnerChannelId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{props.data.channelTitle}</span>
        </a>
      </div>
    </div>
  );
}
