import { getGoogleOAuthURL } from "../utils/getGoogleUri";
import { getCookies, verifyAuthPage } from "../utils/regular_helpers";
import Button from "../Components/UI/button";
import classes from "./index.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <a href={getGoogleOAuthURL()}>
        <Button />
      </a>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  if (ctx.req.headers.cookie) {
    const [session, token] = getCookies(ctx.req.headers.cookie);

    const authenticate = await verifyAuthPage(session, token);

    if (authenticate.success) {
      return {
        redirect: {
          destination: "/subscription",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
}
