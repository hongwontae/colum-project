/* eslint-disable no-unused-vars */
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import ImagePicker from "../../components/image-picker/ImagePicker";
import { useContext, useEffect, useRef, useState } from "react";
import ModifierSelectSegment from "../../components/play-result-form/ModifierSelectSegment";
import { PageCtx } from "../../context/PageContext";
import { buttonTailwindCss } from "../../util/public-button";

function ModifierPage() {
  const { isAuth, setIsAuth } = useContext(PageCtx);

  const [previewImage, setPreviewImage] = useState(null);
  const [pickImage, setPickImage] = useState(null);
  const [acError, setAcError] = useState([]);

  const navigate = useNavigate();
  const submit = useSubmit();
  const { resData, authData } = useLoaderData();
  const acData = useActionData();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const matchTeamRef = useRef(null);
  const matchDayRef = useRef(null);
  const myResultRef = useRef(null);
  const opResultRef = useRef(null);

  useEffect(() => {
    if (authData.jStatus == false) {
      setIsAuth(false);
      navigate("/");
    }
    if (authData.jStatus === true) {
      setIsAuth(true);
    }
  }, [navigate, authData.jStatus, isAuth, setIsAuth]);

  useEffect(() => {
    if (acData) {
      setAcError(acData?.validatorResult);
    }
    if (acData?.jStatus === false) {
      setIsAuth(false);
      navigate("/");
    }
  }, [acData, setIsAuth, navigate]);



  function resetHandler() {
    titleRef.current.value = "";
    matchTeamRef.current.value = "";
    matchDayRef.current.value = null;
    myResultRef.current.value = null;
    opResultRef.current.value = null;
    setAcError([]);
  }

  function actionHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("image", pickImage);

    submit(formData, {
      action: `/modifier/${resData.data.playId}`,
      encType: "multipart/form-data",
      method: "POST",
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mb-4">Update Page</h1>
      <Form
        onSubmit={actionHandler}
        method="POST"
        className="border-[1px] p-4 w-8/12 rounded-lg m-auto mb-8"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1 w-full justify-center">
            <label htmlFor="title" className="text-red-400 font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="text-black text-center rounded-lg w-2/4 p-1"
              defaultValue={resData && resData?.data?.title}
              ref={titleRef}
            ></input>
          </div>

          <ModifierSelectSegment
            defaultValue={resData && resData?.data?.matchTeam}
            ref={matchTeamRef}
          ></ModifierSelectSegment>

          <div className="flex flex-col gap-2 w-1/2 items-center">
            <label htmlFor="matchDay" className="text-red-400 font-bold">
              Match Day
            </label>
            <input
              type="date"
              id="matchDay"
              name="matchDay"
              className="text-black rounded-lg w-full h-8 m-auto text-center"
              defaultValue={resData && resData?.data?.date}
              ref={matchDayRef}
            ></input>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="myScore" className="text-red-400 font-bold mb-4">
              Score
            </label>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <label
                  className="text-red-600 font-bold w-full"
                  htmlFor="myScore"
                >
                  My Score
                </label>
                <input
                  type="number"
                  id="myScore"
                  name="myScore"
                  min={0}
                  className="text-black text-center rounded-sm"
                  defaultValue={resData && resData?.data?.myScore}
                  ref={myResultRef}
                ></input>
              </div>
              <div className="flex gap-6">
                <label className="font-bold w-full" htmlFor="opScore">
                  Opposing Score
                </label>
                <input
                  type="number"
                  className="text-black text-center rounded-sm"
                  id="opScore"
                  name="opScore"
                  min={0}
                  defaultValue={resData && resData?.data?.opponentScore}
                  ref={opResultRef}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
            <label htmlFor="description" className="text-red-400 font-bold">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              className="w-11/12 h-[20rem] text-black text-center rounded-lg p-2 bg-slate-400"
              ref={descriptionRef}
              defaultValue={resData && resData?.data?.playDescription}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <ImagePicker
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              pickImage={pickImage}
              setPickImage={setPickImage}
              notification={
                "If you did not select a photo, it will be replaced with the previous one."
              }
            ></ImagePicker>
          </div>
          {acError && (
            <div className="flex flex-col gap-2 text-red-500 font-bol">
              {acError.map((ele) => {
                return <div key={ele.path}>{ele.msg}</div>;
              })}
            </div>
          )}
          <div className="flex justify-center gap-6">
            <button
              onClick={resetHandler}
              type="button"
              className={buttonTailwindCss}
            >
              Reset
            </button>
            <button type="submit" className={buttonTailwindCss}>
              Save
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default ModifierPage;

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(params.id);

  const response = await fetch(
    `http://localhost:8080/play-result/modi/${params.id}`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("요청 실패");
  }

  const resData = await response.json();

  if (resData.status === false) {
    return resData;
  } else if (resData.status === true) {
    return redirect("/play-result");
  } else if (resData.jStatus === false) {
    return resData;
  }

  return null;
}

export async function loader({ request, params }) {
  const id = params.id;

  const [authResponse, response] = await Promise.all([
    fetch("http://localhost:8080/admin/credential", {
      method: "POST",
      credentials: "include",
    }),
    fetch(`http://localhost:8080/play-result/one?id=${id}`),
  ]);

  if (!response.ok || !authResponse.ok) {
    throw new Response(JSON.stringify({ message: "Modifier page HTTP fail" }), {
      status: 404,
      statusText: "fail",
    });
  }

  const resData = await response.json();
  const authData = await authResponse.json();

  return {
    resData,
    authData,
  };
}
