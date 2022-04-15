import Videos from "../../Components/videos/videos";
import { useAuth, useAuthUpdate } from "../../contexts/auth";

import { useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import { fetchChannels, fetchVideos } from "../../utils/regular_helpers";

export default function videos(props) {
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
    vid = <Videos res={props.res} />;
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

export async function getServerSideProps({ req, response }) {
  const access = req.cookies["access_token"];
  const session = req.cookies["session"];
  let data = await fetchChannels(session, access);
  if (data == false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let res = await fetchVideos(data.channel, access);
  if (data == false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { res } };
}
