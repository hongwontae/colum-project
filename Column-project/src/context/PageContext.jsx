/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

export const PageCtx = createContext({});

export default function PageContextProvider({ children }) {

    const [userInfo, setUserInfo] = useState({
      role : ''
    })

    useEffect(()=>{
      async function infoLife(){
        const response = await fetch('http://localhost:3000/user/login');
      }
    }, [])

    let ctx = {
      userInfo,
      setUserInfo
    }

  return (
    <>
      <PageCtx.Provider value={ctx}>{children}</PageCtx.Provider>
    </>
  );
}
