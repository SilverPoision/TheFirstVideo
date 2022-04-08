import Cookies from "js-cookie";

export function removeCookieAndLocalstorage(cookies) {
  cookies.map((el) => {
    Cookies.remove(el);
    localStorage.removeItem(el);
  });
}
