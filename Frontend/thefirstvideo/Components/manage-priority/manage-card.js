import classes from "./manage-card.module.css";

import Image from "next/image";

export default function ManageCard(props) {
  return (
    <div className={classes.container} key={props._id}>
      <span className={classes.pri}>{props.priority}</span>
      <span className={classes.name}>{props.name}</span>
      <div className={classes.arrow}>
        <Image
          onClick={() => props.deleteChannel(props.id)}
          className={classes.delete}
          src="/icons/delete.svg"
          height={20}
          width={20}
        />
        <Image
          className={classes.arrowUp}
          onClick={() =>
            props.priorityHandler(props.priority, props.name, "up")
          }
          src="/icons/up.svg"
          height={30}
          width={30}
        />

        <Image
          className={classes.arrowDown}
          onClick={() =>
            props.priorityHandler(props.priority, props.name, "down")
          }
          src="/icons/down.svg"
          height={30}
          width={30}
        />
      </div>
    </div>
  );
}
