import { Outlet } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";
import LoginInfoBox from '../login-info-box/LoginInfoBox';

function Layout() {
  return (
    <>
      <div className="flex flex-col bg-slate-800 min-h-screen text-center font-markazi">
        <div className="flex justify-center items-center relative w-full p-4">
          <MainNavigation></MainNavigation>
          <LoginInfoBox></LoginInfoBox>
        </div>
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <div className="bg-red-500 p-1 text-[1.3rem] font-bold">
          Author : HWT
        </div>
      </div>
    </>
  );
}

export default Layout;
