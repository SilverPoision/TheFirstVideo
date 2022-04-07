import { useContext, createContext, useState } from "react";
import Cookies from "js-cookie";

const authContext = createContext();
const authUpdateContext = createContext();

export function useAuth() {
  return useContext(authContext);
}
export function useAuthUpdate() {
  return useContext(authUpdateContext);
}

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  function verifyAuth(token, session) {
    fetch("http://localhost:1337/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: token,
        session: session,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAuth(true);
        } else {
          Cookies.remove("session");
          Cookies.remove("access_token");
        }
      });
  }

  return (
    <authContext.Provider value={auth}>
      <authUpdateContext.Provider
        value={(token, session) => verifyAuth(token, session)}
      >
        {children}
      </authUpdateContext.Provider>
    </authContext.Provider>
  );
}

export default AuthProvider;
