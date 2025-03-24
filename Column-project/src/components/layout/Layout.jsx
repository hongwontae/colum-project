import { Outlet } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";

function Layout() {
  
  return (
    <>
      <div className="bg-slate-800 min-h-screen text-center flex flex-col text-zinc-100">
        <MainNavigation></MainNavigation>
        <main className="flex-grow">
          <div>
            <Outlet></Outlet>
          </div>
        </main>
        <div className="bg-red-500 p-1">Author : HWT</div>
      </div>
    </>
  );
}

export default Layout;
