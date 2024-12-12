/* eslint-disable no-unused-vars */
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import { useContext } from "react";
import Logout from "../login/Logout";
import { PageCtx } from "../../context/PageContext";

function MainNavigation() {
  const { isAuth } = useContext(PageCtx);

  return (
    <>
      <header className="w-3/4 m-auto p-8 flex justify-center text-customFontSize">
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
                to={"/play-result?page=1"}
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
                end
              >
                Play-Result
              </NavLink>
            </li>
            {isAuth ? (
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
                to={"/player-rating"}
                className={({ isActive }) => {
                  return isActive ? classes.active : null;
                }}
                end
              >
                Player-Rating
              </NavLink>
            </li>

            {isAuth ? (
              <li className={classes.list}>
                <NavLink
                  to={"/player-rating/form"}
                  className={({ isActive }) => {
                    return isActive ? classes.active : null;
                  }}
                  end
                >
                  Play-Rating-Form
                </NavLink>
              </li>
            ) : null}
            {isAuth ? null : (
              <li className={classes.list}>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) => {
                    return isActive ? classes.active : null;
                  }}
                  end
                >
                  Admin-Login
                </NavLink>
              </li>
            )}
            {isAuth ? <Logout></Logout> : null}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainNavigation;
