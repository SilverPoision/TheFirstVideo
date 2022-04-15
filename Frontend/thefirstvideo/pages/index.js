import { getGoogleOAuthURL } from "../utils/getGoogleUri";
import { verifyAuthPage } from "../utils/regular_helpers";
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
  const session = ctx.req.cookies["session"];
  const access = ctx.req.cookies["access_token"];
  if (session && access) {
    const authenticate = await verifyAuthPage(session, access);

    if (authenticate.success) {
      return {
        redirect: {
          destination: "/subscription",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
