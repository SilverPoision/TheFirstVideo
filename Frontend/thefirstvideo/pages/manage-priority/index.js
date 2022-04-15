import Manage from "../../Components/manage-priority/manage";
import { useAuth, useAuthUpdate } from "../../contexts/auth";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { fetchChannels } from "../../utils/regular_helpers";

export default function ManagePriority(props) {
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
    manage = <Manage channels={props.data} />;
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

export async function getServerSideProps({ req, res }) {
  const access = req.cookies["access_token"];
  const session = req.cookies["session"];
  const channels = await fetchChannels(session, access);
  if (channels == false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: { data: channels } };
}
