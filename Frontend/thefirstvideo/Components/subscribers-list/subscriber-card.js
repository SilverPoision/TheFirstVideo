import classes from "./subscriber-card.module.css";

export default function SubCard(props) {
  return (
    <div key={props.id} className={classes.card}>
      <img src={props.image} /> {/*/next/image*/}
      <div>
        <span>{props.name}</span>
      </div>
    </div>
  );
}
