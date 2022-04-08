import { useEffect } from "react";
import Router from "next/router";

import { useAuth, useAuthUpdate } from "../../contexts/auth";
import { getCookies } from "../../utils/regular_helpers";

export default function Subscription(props) {
  const updateAuth = useAuthUpdate();
  const auth = useAuth();
  useEffect(() => {
    updateAuth();
    if (!auth.auth) {
      Router.push("/");
    }
  }, []);
  return <div>Subscription of {props.name}</div>;
}

export async function getServerSideProps(ctx) {
  if (ctx.req.headers.cookie) {
    const [session, token] = getCookies(ctx.req.headers.cookie);
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
        props: {
          auth: true,
          name: data.user.name,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
