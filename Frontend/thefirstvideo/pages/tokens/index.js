import Cookies from "cookies";

export default function token() {}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const { session, access_token } = query;

  /* I know this is a security issue and I should not send the token naked 
      via GET request in query params but I think I don't have any options to
      do so because I then have to host the backend and frontend on the same 
      domain to share the cookies between them and Heroku doesn't allow custom
      domains until you purchase premium so after getting from all the workarounds
      I have to finalise this approach. Let me know if anyone can sort this out 
      I will be glad to fix it. */

  cookies.set("session", session, {
    httpOnly: false,
    maxAge: 3600000,
  });
  cookies.set("access_token", access_token, {
    httpOnly: false,
    maxAge: 3600000,
  });

  return {
    props: {
      redirect: {
        destination: "/subscription",
        permanent: false,
      },
    },
  };
}
