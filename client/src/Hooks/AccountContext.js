import { createContext, useEffect } from "react";
import usePersistedState from "./usePersistedState";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [userInfo, setUserInfo] = usePersistedState(null, "user")

  return (
    <AccountContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </AccountContext.Provider>
  );
};