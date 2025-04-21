/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import Logout from "../login/Logout";
import {userStore} from '../../zustand-store/user-store';

function MainNavigation() {
  const userInfo = userStore(state=>state.userState);

  return (
    <>
      <header className="flex justify-center text-[1.5rem]">
        <nav>
          <ul className={`flex gap-7 items-center `}>
            <li className={classes.list}>
              <NavLink
                to={"/"}
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
                end
              >
                HomePage
              </NavLink>
            </li>
            <li className={classes.list}>
              <NavLink
                to={"/public/play-result"}
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
                end
              >
                Play-Result
              </NavLink>
            </li>
            {userInfo?.role ? (
              <li className={classes.list}>
                <NavLink
                  to={"/play-result-form"}
                  className={({ isActive }) => {
                    return isActive ? classes.active : null;
                  }}
                  end
                >
                  Play-Result-Form
                </NavLink>
              </li>
            ) : null}

            <li className={classes.list}>
              <NavLink
                to={"/play-rating"}
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
                end
              >
                Player-Rating
              </NavLink>
            </li>

            {userInfo?.role ? (
              <li className={classes.list}>
                <NavLink
                  to={"/play-rating/form"}
                  className={({ isActive }) => {
                    return isActive ? classes.active : null;
                  }}
                  end
                >
                  Play-Rating-Form
                </NavLink>
              </li>
            ) : null}
            {userInfo?.role ? null : (
              <li className={classes.list}>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) => {
                    return isActive ? classes.active : null;
                  }}
                  end
                >
                  Login
                </NavLink>
              </li>
            )}
            {userInfo?.role ? <Logout></Logout> : null}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainNavigation;
