/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

export const PageCtx = createContext({
  userInfo: { email: "", role: "" },
  setUserInfo: () => {},
});

export default function PageContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    role: "",
    email : ""
  });

  useEffect(() => {
    async function infoLife() {
      const response = await fetch("http://localhost:3000/user/reload",{
        method : 'POST',
        credentials : 'include'
      });

      if (!response.ok) {
        return console.log(await response.json())
      }

      const resData = await response.json();

      resData?.data
        ? setUserInfo({ role: resData.data.role, email: resData.data.email })
        : setUserInfo(null);
    }

    infoLife();
  }, []);

  let ctx = {
    userInfo,
    setUserInfo,
  };

  return (
    <>
      <PageCtx.Provider value={ctx}>{children}</PageCtx.Provider>
    </>
  );
}
