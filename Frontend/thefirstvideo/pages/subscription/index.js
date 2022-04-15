import { useAuth, useAuthUpdate } from "../../contexts/auth";
import Subscribers from "../../Components/subscribers-list/subscriber";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { fetchSubs } from "../../utils/regular_helpers";

export default function Subscription(props) {
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
    sub = <Subscribers data={props.data} />;
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

export async function getServerSideProps({ req, res }) {
  const access = req.cookies["access_token"];
  const subs = await fetchSubs(access);
  if (subs == false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { data: subs } };
}
