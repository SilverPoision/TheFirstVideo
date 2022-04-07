const getGoogleOAuthURL = () => {
  const root_url = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: "http://localhost:1337/api/sessions/oauth/google",
    client_id:
      "34816552916-tc0np488mhjs6m9lon8s01hk8hot0kjr.apps.googleusercontent.com",
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
};

export default getGoogleOAuthURL;
