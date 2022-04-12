import { getCookies, verifyAuthPage } from "../../utils/regular_helpers";
import Subscribers from "../../Components/subscribers-list/subscriber";

export default function Subscription() {
  return (
    <>
      <Subscribers />
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
          props: {
            auth: true,
            name: authenticate.user.name,
          },
        };
      }
    }
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
