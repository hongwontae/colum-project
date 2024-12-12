/* eslint-disable no-unused-vars */
import { useContext, useEffect, useId, useRef, useState } from "react";
import { Form, redirect, useActionData, useSubmit } from "react-router-dom";

function LoginForm() {
  const actionData = useActionData();

  const [acData, setAcData] = useState(null);

  useEffect(() => {
    setAcData(actionData?.data?.message);
  }, [actionData]);

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
    setAcData(null);
  }

  const buttonTailwindCss = `px-5 py-2.5 bg-gray-800 text-white font-medium rounded-md 
  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150`
    

  return (
    <>
      <Form
        method="POST"
        onSubmit={actionHandler}
        className="flex flex-col justify-center items-center gap-4 border-[1px] w-4/6 m-auto p-12 rounded-lg mt-6"
      >
        <h2 className="text-red-500 text-4xl mb-6 font-bold">
          Admin Login
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
          <div className="text-red-600 font-bold text-[1.2rem] mt-4">{acData}</div>
        )}
        <div className="flex justify-end gap-4 mt-2 w-full">
          <button type="submit" className={buttonTailwindCss}>
            Login
          </button>
          <button
            onClick={cancelHandler}
            type="button"
            className={buttonTailwindCss}
          >
            Reset
          </button>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;

export async function loginAction({ request, params }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:8080/admin/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("에러 발생");
  }

  const resData = await response.json();

  if (resData?.status === true) {
    return redirect("/");
  } else {
    return { message: "action trigger", data: resData };
  }
}
