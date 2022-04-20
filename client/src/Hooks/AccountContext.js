import { useState } from "react";
import { createContext, useEffect } from "react";
import usePersistedState from "./usePersistedState";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [userInfo, setUserInfo] = usePersistedState(null, "user");
  const [screenSize, setScreenSize] = useState("small");

  useEffect(() => {
    detectWindowSize();
  }, []);

  function detectWindowSize() {
    if (window.innerWidth < 600) return setScreenSize("small");
    if (window.innerWidth < 1000) return setScreenSize("medium");
    return setScreenSize("large");
  }

  window.onresize = detectWindowSize;

  return (
    <AccountContext.Provider value={{ userInfo, setUserInfo, screenSize }}>
      {children}
    </AccountContext.Provider>
  );
};
