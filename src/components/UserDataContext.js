import React from "react";
import { createContext, useState } from "react";

export const userContext = createContext();
const UserDataContext = ({ children }) => {
  const [show, setShow] = useState({});

  return (
    <userContext.Provider value={{ show, setShow }}>
      {children}
    </userContext.Provider>
  );
};

export default UserDataContext;
