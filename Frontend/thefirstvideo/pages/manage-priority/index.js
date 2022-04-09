import { useEffect } from "react";
import Router from "next/router";

import { useAuth, useAuthUpdate } from "../../contexts/auth";
import { getCookies, verifyAuthPage } from "../../utils/regular_helpers";

export default function Manage(props) {
  const updateAuth = useAuthUpdate();
  const auth = useAuth();
  useEffect(() => {
    updateAuth();
    if (!auth.auth) {
      Router.push("/");
    }
  }, []);
  return <></>;
}

export async function getServerSideProps(ctx) {
  if (ctx.req.headers.cookie) {
    const [session, token] = getCookies(ctx.req.headers.cookie);
    const authenticate = await verifyAuthPage(session, token);

    if (authenticate.success) {
      return {
        props: {
          auth: true,
          name: authenticate.user.name,
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
