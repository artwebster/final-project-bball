import { useState, useEffect } from "react";

const usePersistedState = (defaultValue, key) => {
  const [value, setValue] = useState(() => JSON.parse(window.localStorage.getItem(key)) || defaultValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default usePersistedState;
