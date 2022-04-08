import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

import { removeCookieAndLocalstorage } from "../utils/regular_helpers";

let token, session;
if (typeof window !== "undefined") {
  session = Cookies.get("session");
  token = Cookies.get("access_token");
  if (session && token) {
    localStorage.setItem("session", session);
    localStorage.setItem("access_token", token);
  }
  session = localStorage.getItem("session");
  token = localStorage.getItem("access_token");
}

const authContext = createContext();
const authUpdateContext = createContext();
const signOutContext = createContext();

export function useAuth() {
  return useContext(authContext);
}
export function useAuthUpdate() {
  return useContext(authUpdateContext);
}
export function useSignOut() {
  return useContext(signOutContext);
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ auth: false });

  function verifyAuth() {
    fetch("http://localhost:1337/authenticate", {
      headers: {
        Authorization: session,
        "Access-Token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuth({ ...auth, auth: true, name: data.user.name });
        } else {
          removeCookieAndLocalstorage(["session", "access_token"]);
        }
      });
  }

  function signout() {
    fetch("http://localhost:1337/logout", {
      headers: {
        Authorization: session,
        "Access-Token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuth({ auth: false });
          removeCookieAndLocalstorage(["session", "access_token"]);
          window.location.href = "http://localhost:3000/";
        }
      });
  }

  return (
    <authContext.Provider value={auth}>
      <authUpdateContext.Provider value={verifyAuth}>
        <signOutContext.Provider value={signout}>
          {children}
        </signOutContext.Provider>
      </authUpdateContext.Provider>
    </authContext.Provider>
  );
}

export default AuthProvider;
