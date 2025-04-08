/* eslint-disable no-unused-vars */
import { useContext, useEffect, useId, useRef } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { PageCtx } from "../../context/PageContext";

function LoginForm() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(PageCtx);
  const actionData = useActionData();

  useEffect(() => {
    if (actionData?.email && actionData?.role) {
      setUserInfo({ role: actionData?.role, email: actionData?.email });
      navigate("/");
    }
  }, [actionData, setUserInfo, navigate]);

  const id1 = useId();
  const id2 = useId();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = useSubmit();

  function actionHandler(e) {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      console.log("No Data");
      return;
    }

    const formData = new FormData(e.target);

    submit(formData, { method: "POST", action: "/login" });
  }

  function cancelHandler() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  const buttonTailwindCss = `px-5 py-2.5 bg-gray-800 text-white font-medium rounded-md 
  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150`;

  return (
    <>
      <Form
        method="POST"
        onSubmit={actionHandler}
        className="text-[1.5rem] flex flex-col justify-center items-center gap-4 border-[1px] w-4/6 m-auto p-12 rounded-lg mt-6"
      >
        <h2 className="text-red-500 text-[3.2rem] mb-2 font-bold">
          Login Form
        </h2>
        <div className="flex justify-center gap-10 ">
          <label htmlFor={id1} className="text-red-300 font-bold">
            E-Mail
          </label>
          <input
            id={id1}
            ref={emailRef}
            type="text"
            name="email"
            className="rounded-sm text-black text-center p-[0.1rem] "
          ></input>
        </div>
        <div className="flex justify-center gap-4">
          <label htmlFor={id2} className="text-red-300 font-bold">
            Password
          </label>
          <input
            id={id2}
            ref={passwordRef}
            type="password"
            name="password"
            className="rounded-sm text-black text-center p-[0.1rem]"
          ></input>
        </div>
        {actionData && (
          <div className="text-red-600 font-bold text-[1.2rem] mt-4">{}</div>
        )}
        <div className="flex justify-end gap-4 mt-2 w-full">
          <button onClick={cancelHandler} className={buttonTailwindCss}>
            Reset
          </button>
          <button type="submit" className={buttonTailwindCss}>
            Login
          </button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;

export async function loginAction({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    console.log("Error");
  }

  const resData = await response.json();

  return resData;
}
