import Manage from "../../Components/manage-priority/manage";
import { useAuth, useAuthUpdate } from "../../contexts/auth";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

export default function ManagePriority() {
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

  let manage = null;

  if (auth.auth) {
    manage = <Manage />;
  }
  return (
    <>
      <Head>
        <title>Manage Priority</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {manage}
    </>
  );
}
