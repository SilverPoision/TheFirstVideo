import axios from "axios";

export function getGoogleOAuthURL() {
  const root_url = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URL,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/youtube.readonly",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  // console.log(qs);

  return `${root_url}?${qs.toString()}`;
}
