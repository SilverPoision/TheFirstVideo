import Videos from "../../Components/videos/videos";
import { useAuth, useAuthUpdate } from "../../contexts/auth";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

export default function videos() {
  const auth = useAuth();
  const updateAuth = useAuthUpdate();

  useEffect(() => {
    updateAuth();
    if (!auth.auth) {
      if (Router.asPath != "/") {
        Router.push("/");
      }
    }
  }, []);

  let vid = null;

  if (auth.auth) {
    vid = <Videos />;
  }
  return (
    <>
      <Head>
        <title>New Videos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {vid}
    </>
  );
}
