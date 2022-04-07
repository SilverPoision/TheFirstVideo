import { getGoogleOAuthURL, verifyAuth } from "../utils/getGoogleUri";
import Button from "../Components/UI/button";
import classes from "./index.module.css";
import { useAuth, useAuthUpdate } from "../contexts/auth";

import Cookies from "js-cookie";

export default function Home() {
  const auth = useAuth();
  const authUpdate = useAuthUpdate();
  const session = Cookies.get("session");
  const token = Cookies.get("access_token");
  if (session && token) {
    authUpdate(token, session);
  }

  return (
    <div className={classes.container}>
      <a href={getGoogleOAuthURL()}>
        <Button />
      </a>
    </div>
  );
}
