/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useMemo, useState } from "react";

export const PageCtx = createContext({
  isAuth: false,
  logoutHandler: () => {},
  loginHandler: () => {},
  setIsAuth: () => {},
});

export default function PageContextProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  async function logoutHandler() {
    const response = await fetch("http://localhost:8080/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("응답 실패");
    }

    const resData = await response.json();

    if (resData.status === true) {
      setIsAuth(false);
    } else {
      return;
    }
  }

  const ctx = {
    isAuth: isAuth,
    logoutHandler,
    setIsAuth,
  };


  return (
    <>
      <PageCtx.Provider value={ctx}>{children}</PageCtx.Provider>
    </>
  );
}
