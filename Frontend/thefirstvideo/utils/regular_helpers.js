import Cookies from "js-cookie";

export function removeCookieAndLocalstorage(cookies) {
  if (typeof window !== "undefined") {
    cookies.map((el) => {
      Cookies.remove(el);
      localStorage.removeItem(el);
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

// export function verifyAuth(session, token) {
//   fetch("http://localhost:1337/authenticate", {
//     headers: {
//       Authorization: session,
//       "Access-Token": token,
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) {
//         console.log(1, true);
//         return true;
//       } else {
//         removeCookieAndLocalstorage(["session", "access_token"]);
//         return false;
//       }
//     });
// }
