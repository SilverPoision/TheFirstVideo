import Cookies from "cookies";

export default function token() {}

export async function getServerSideProps({ req, res, query }) {
  const cookies = new Cookies(req, res);
  const { session, access_token } = query;

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
