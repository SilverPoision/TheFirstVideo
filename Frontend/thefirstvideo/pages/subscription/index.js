import { useAuth, useAuthUpdate } from "../../contexts/auth";
import Subscribers from "../../Components/subscribers-list/subscriber";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

export default function Subscription() {
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

  let sub = null;

  if (auth.auth) {
    sub = <Subscribers />;
  }
  return (
    <>
      <Head>
        <title>Subscriptions</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {sub}
    </>
  );
}
