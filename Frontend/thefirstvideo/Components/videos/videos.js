import VideosCard from "./videos-card";
import classes from "./videos.module.css";

export default function Videos(props) {
  let vid = null;

  if (props.res) {
    vid = Object.values(props.res).map((el) => {
      return <VideosCard key={el.id} data={el} />;
    });
  }

  return <div className={classes.container}>{vid}</div>;
}
