import { getGoogleOAuthURL } from "../utils/getGoogleUri";
import Button from "../Components/UI/button";
import classes from "./index.module.css";
import { useAuthUpdate, useAuth } from "../contexts/auth";

import Cookies from "js-cookie";

export default function Home() {
  const authUpdate = useAuthUpdate();
  const auth = useAuth();

  if (!auth.auth) {
    authUpdate();
  }

  let button = (
    <a href={getGoogleOAuthURL()}>
      <span>Welcome {auth.name}</span>
    </a>
  );

  if (!auth.auth) {
    button = (
      <a href={getGoogleOAuthURL()}>
        <Button />
      </a>
    );
  }

  return <div className={classes.container}>{button}</div>;
}
