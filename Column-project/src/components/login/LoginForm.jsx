/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageCtx } from "../../context/PageContext";
import CreateUserForm from "../create-user/CreateUserForm";
import {userStore} from '../../zustand-store/user-store'

const buttonTailwindCss = `px-5 py-2.5 bg-gray-800 text-white font-medium rounded-md 
  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150`;

function LoginForm() {
  const navigate = useNavigate();
  const setFunction = userStore(state=>state.setUserInfo)
  const [lc, setLc] = useState("login");
  const [erorrs, setErrors] = useState([]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function actionHandler(e) {
    e.preventDefault();

    if (
      emailRef.current.value === "" || passwordRef.current.value === ""
    ) {
      return setErrors(["이메일이나 패스워드 길이가 부족합니다.",]);
    }

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });

    const resData = await response.json();
    console.log(resData);
    if (!response.ok) {
      const errorData = resData.errors.map((ele)=>{
        ele = ele.messages;
        return Object.values(ele)
      })
      return setErrors(errorData)
    } else {
      setFunction(resData.email, resData.role);
      navigate("/");
    }
  }

  function cancelHandler() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    setErrors([]);
  }

  return (
    <>
      {lc === "login" ? (
        <form
          onSubmit={actionHandler}
          className="text-[1.5rem] flex flex-col justify-center items-center gap-4 border-[1px] w-4/6 m-auto p-12 rounded-lg mt-6"
        >
          <h2 className="text-red-500 text-[3.2rem] mb-2 font-bold">
            Login Form
          </h2>
          <div className="flex justify-center gap-10 ">
            <label htmlFor="email" className="text-red-300 font-bold">
              E-Mail
            </label>
            <input
              id="email"
              ref={emailRef}
              type="text"
              name="email"
              className="rounded-sm text-black text-center p-[0.1rem] "
            ></input>
          </div>
          <div className="flex justify-center gap-4">
            <label htmlFor="password" className="text-red-300 font-bold">
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              name="password"
              className="rounded-sm text-black text-center p-[0.1rem]"
            ></input>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {erorrs?.length === 0
              ? null
              : erorrs?.map((ele) => {
                  return (
                    <>
                      <div className="text-bold text-white text-[1.2rem]">
                        {ele}
                      </div>
                    </>
                  );
                })}
          </div>

          <div className="grid grid-cols-custom-3 gap-2 mt-2 w-full">
            <button
              className={buttonTailwindCss + " w-[80%]"}
              onClick={() => {
                return setLc("create");
              }}
            >
              User Create
            </button>
            <div></div>
            <div></div>
            <div></div>
            <button
              type="button"
              onClick={cancelHandler}
              className={buttonTailwindCss}
            >
              Reset
            </button>
            <button type="submit" className={buttonTailwindCss}>
              Login
            </button>
          </div>
        </form>
      ) : (
        <CreateUserForm setLc={setLc}></CreateUserForm>
      )}
    </>
  );
}

export default LoginForm;
