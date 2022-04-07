import getGoogleOAuthURL from "../utils/getGoogleUri";

export default function Home() {
  return (
    <div>
      <a href={getGoogleOAuthURL()}>Login with Google</a>
      <br />
      Please Login
    </div>
  );
}
