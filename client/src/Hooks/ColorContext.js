import { createContext, useEffect } from "react";
import usePersistedState from "./usePersistedState";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [theme, setTheme] = usePersistedState("light", "theme")

    useEffect(() => {
      switch (theme) {
        case ("light"):
          document.documentElement.setAttribute("data-theme", "light");
          break;
        case ("dark"):
          document.documentElement.setAttribute("data-theme", "dark");
          break;
      }
    }, [theme]);
  
  return (
    <ColorContext.Provider value={{ setTheme, theme }}>
      {children}
    </ColorContext.Provider>
  );
};
