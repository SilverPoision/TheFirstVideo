import classes from "./subscriber-card.module.css";

import Image from "next/image";

export default function SubCard(props) {
  return (
    <div key={props.id} className={classes.card}>
      <img src={props.image} />
      <div>
        <a
          href={`https://www.youtube.com/channel/${props.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{props.name}</span>
        </a>
      </div>
    </div>
  );
}
