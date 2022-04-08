import { getGoogleOAuthURL } from "../utils/getGoogleUri";
import Button from "../Components/UI/button";
import classes from "./index.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <a href={getGoogleOAuthURL()}>
        <Button />
      </a>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let cookies, session, token;
  try {
    cookies = ctx.req.headers.cookie.split(" ");
    session = cookies[0].split("=")[1];
    session = session.split(";")[0];
    token = cookies[1].split("=")[1];
  } catch {}

  let res = await fetch("http://localhost:1337/authenticate", {
    headers: {
      method: "GET",
      "Content-Type": "application/json",
      Authorization: session,
      "Access-Token": token,
    },
  });
  const data = await res.json();

  if (data.success) {
    return {
      redirect: {
        destination: "/subscription",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
