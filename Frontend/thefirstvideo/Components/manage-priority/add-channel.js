import classes from "./add-channel.module.css";

import { useRef } from "react";

export default function AddChannel(props) {
  const nameRef = useRef();
  const priorityRef = useRef();
  return (
    <div className={classes.container}>
      <span>Add Channel</span>
      <input ref={nameRef} type="text" placeholder="Channel Name" />
      <input ref={priorityRef} type="number" placeholder="Priority" />
      <div className={classes.button}>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(nameRef.current.value, priorityRef.current.value);
            props.addChan(nameRef.current.value, priorityRef.current.value);
            nameRef.current.value = null;
            priorityRef.current.value = null;
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
