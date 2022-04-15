import { getGoogleOAuthURL } from "../utils/getGoogleUri";
import { getCookies, verifyAuthPage } from "../utils/regular_helpers";
import Button from "../Components/UI/button";
import classes from "./index.module.css";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.container}>
        <a href={getGoogleOAuthURL()}>
          <Button />
        </a>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  if (ctx.req.headers.cookie) {
    const [session, token] = getCookies(ctx.req.headers.cookie);
    if (session && token) {
      const authenticate = await verifyAuthPage(session, token);

      if (authenticate.success) {
        return {
          redirect: {
            destination: "/subscription",
            permanent: false,
          },
        };
      }
    }
  }

  return {
    props: {},
  };
}
