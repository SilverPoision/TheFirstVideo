import { getCookies, verifyAuthPage } from "../../utils/regular_helpers";
import Manage from "../../Components/manage-priority/manage";

export default function ManagePriority() {
  return <Manage />;
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
