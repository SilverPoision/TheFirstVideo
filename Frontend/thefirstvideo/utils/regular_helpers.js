import Cookies from "js-cookie";

export function removeCookieAndLocalstorage(cookies) {
  if (typeof window !== "undefined") {
    cookies.map((el) => {
      Cookies.remove(el);
    });
  }
}

export function getCookies(cookie) {
  let cookies = cookie.split(" ");
  let session = cookies[0].split("=")[1];
  session = session.split(";")[0];
  let token = cookies[1].split("=")[1];
  return [session, token];
}

export async function fetchSubs() {
  const access = Cookies.get("access_token");
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/subscriptions?mine=true&access_token=${access}&maxResults=50&part=snippet`
  );
  const data = await res.json();
  return data;
}

export async function verifyAuthPage(session, token) {
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/authenticate`,
    {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: session,
        "Access-Token": token,
      },
    }
  );
  const data = await res.json();
  if (data.success) {
    return { success: true, user: data.user };
  } else {
    return { success: false };
  }
}
