import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

import { removeCookieAndLocalstorage } from "../utils/regular_helpers";

let token, session;

const authContext = createContext();
const authUpdateContext = createContext();
const signOutContext = createContext();
const prioritesContext = createContext();

export function useAuth() {
  return useContext(authContext);
}
export function useAuthUpdate() {
  return useContext(authUpdateContext);
}
export function useSignOut() {
  return useContext(signOutContext);
}
export function useChannelPriorites() {
  return useContext(signOutContext);
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ auth: false });
  // const [priorities, setPriorities] = useState({});

  function verifyAuth() {
    if (typeof window !== "undefined") {
      session = Cookies.get("session");
      token = Cookies.get("access_token");
    }
    if (!session && !token) {
      return setAuth({ auth: false });
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/authenticate`, {
      headers: {
        Authorization: session,
        "Access-Token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (!auth.auth) {
            return setAuth({ ...auth, auth: true, name: data.user.name });
          }
        } else {
          Cookies.remove("session");
          Cookies.remove("access_token");
          if (auth.auth) {
            return setAuth({ auth: false });
          }
        }
      });
  }

  function signout() {
    if (typeof window !== "undefined") {
      session = Cookies.get("session");
      token = Cookies.get("access_token");
    }
    if (!session && !token) {
      return setAuth({ auth: false });
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/logout`, {
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
          window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_ENDPOINT}`;
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
