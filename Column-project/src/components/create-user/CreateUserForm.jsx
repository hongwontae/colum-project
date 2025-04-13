/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

const buttonTailwindCss = `px-5 py-2.5 bg-gray-800 text-white font-medium rounded-md 
  hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150`;

function CreateUserForm({ setLc }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);

  console.log(errorMessages);
  async function createUserHandler(e) {
    e.preventDefault();

    console.log(Boolean(emailRef.current.value === 0));

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setErrorMessages([
        "이메일이나 패스워드 길이가 충분하지 않습니다.",
      ]);
    }

    const response = await fetch("http://localhost:3000/user/create", {
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

    if (!response.ok) {
      console.log(resData);
      const errorArr = resData?.errors?.map((ele) => {
        ele = ele.messages;
        return Object.values(ele);
      });
      return setErrorMessages(errorArr);
    } else {
      return setLc("login");
    }
  }

  function resetHandler() {
    setErrorMessages([]);
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <>
      <form className="text-[1.5rem] flex flex-col justify-center items-center gap-4 border-[1px] w-4/6 m-auto p-12 rounded-lg mt-6">
        <h2 className="text-red-500 text-[3.2rem] mb-2 font-bold">
          Create User Form
        </h2>
        <div className="flex justify-center gap-10 ">
          <label htmlFor={"email"} className="text-red-300 font-bold">
            E-Mail
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="rounded-sm text-black text-center p-[0.1rem] "
            ref={emailRef}
          ></input>
        </div>
        <div className="flex justify-center gap-4">
          <label htmlFor={"password"} className="text-red-300 font-bold">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            className="rounded-sm text-black text-center p-[0.1rem]"
          ></input>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {errorMessages?.length == 0
            ? null
            : errorMessages.map((ele) => {
                console.log(ele);
                return (
                  <>
                    <div
                      className="text-bold text-white text-[1.2rem]"
                      key={ele}
                    >
                      {ele}
                    </div>
                  </>
                );
              })}
        </div>

        <div className="grid grid-cols-custom-3 gap-4 mt-2 w-full">
          <div
            className={buttonTailwindCss + " w-[80%]"}
            onClick={() => {
              return setLc("login");
            }}
          >
            User Login
          </div>
          <div></div>
          <div></div>
          <div></div>
          <button
            type="button"
            onClick={resetHandler}
            className={buttonTailwindCss}
          >
            Reset
          </button>
          <button
            type="button"
            className={buttonTailwindCss}
            onClick={createUserHandler}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateUserForm;
