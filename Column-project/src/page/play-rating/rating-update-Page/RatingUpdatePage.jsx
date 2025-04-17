import { useContext, useEffect, useRef, useState } from "react";
import { useActionData, useLoaderData, useNavigate } from "react-router";
import { PageCtx } from "../../context/PageContext";
import { Form, useSubmit } from "react-router-dom";
import ModifierSelectSegment from "../../components/play-result-form/ModifierSelectSegment";
import { buttonTailwindCss, updateButtonCss } from "../../util/public-button";
import { FaPlus, FaMinus } from "react-icons/fa";
import UpdateRatingSingle from "./UpdateRatingSingle";

function RatingUpdatePage() {
  const { authData, formattedResData, resData } = useLoaderData();
  const [ratings, setRatings] = useState([...formattedResData]);
  const { setIsAuth } = useContext(PageCtx);
  const acData = useActionData();
  const [errorData, setErrorData] = useState([]);
  const navigate = useNavigate();
  const submit = useSubmit();

  const titleRef = useRef(null);
  const matchDayRef = useRef(null);
  const matchTeamRef = useRef(null);
  const matchDescRef = useRef(null);

  function ratingHandler(value, pId) {
    if (isNaN(value) || +value > 9 || +value < 0) {
      return;
    }

    setRatings((prev) => {
      const copyPrev = [...prev];
      const selectedIndex = copyPrev.findIndex((ele) => ele.pId === pId);
      const selectedObject = copyPrev.find((ele) => ele.pId === pId);
      copyPrev[selectedIndex] = {
        ...selectedObject,
        rating: value,
      };
      return copyPrev;
    });
  }

  function resetHandler() {
    titleRef.current.value = "";
    matchDayRef.current.value = "";
    matchTeamRef.current.value = "";
    matchDescRef.current.value = "";
    setRatings((prev) => {
      const copyPrev = [...prev];
      const data = copyPrev.map((ele) => {
        return {
          ...ele,
          rating: "",
        };
      });
      return data;
    });
    setErrorData([]);
  }

  function ratingPlusHandler() {
    setRatings((prev) => {
      const copyPrev = [...prev];
      copyPrev.push({
        pId: new Date().toISOString().toString(),
        playerName: "Uncertain",
        rating: "",
        etc: "etc",
      });
      return copyPrev;
    });
  }
  function ratingMinusHandler() {
    setRatings((prev) => {
      const copyArr = [...prev];
      copyArr.pop();
      return copyArr;
    });
  }

  function submitHandler() {
    const postData = {
      title: titleRef.current.value,
      day: matchDayRef.current.value,
      matchTeam: matchTeamRef.current.value,
      matchDesc: matchDescRef.current.value,
      ratings: JSON.stringify(ratings),
    };
    submit(postData, {
      method: "POST",
    });
  }

  useEffect(() => {
    if (authData.jStatus === false) {
      setIsAuth(false);
      navigate("/");
    }
    if (authData.jStatus === true) {
      setIsAuth(true);
    }
  }, [authData?.jStatus, setIsAuth, navigate]);

  useEffect(() => {
    setErrorData(acData?.validatorResult);
  }, [acData, setErrorData]);

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-red-500 font-bold text-2xl mb-4">
          Rating Update Page
        </h1>
        <Form className="border-[1px] rounded-lg w-9/12 p-2 flex flex-col gap-4">
          <div className="flex flex-col w-1/2 m-auto items-center">
            <label htmlFor="title" className="text-red-400 font-bold">
              Title
            </label>
            <input
              className="w-2/3 rounded-lg text-center text-black max-sm:w-full"
              id="title"
              ref={titleRef}
              defaultValue={resData && resData?.rrData?.title}
              type="text"
            ></input>
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="day" className="text-red-400 font-bold">
              Match Day
            </label>
            <input
              className="w-2/5 text-center text-black rounded-lg max-sm:w-1/2"
              type="date"
              ref={matchDayRef}
              defaultValue={resData && resData?.rrData?.reportDate}
              id="day"
            ></input>
          </div>
          <div className="flex justify-center">
            <ModifierSelectSegment
              ref={matchTeamRef}
              defaultValue={resData && resData?.rrData?.oppenent}
            ></ModifierSelectSegment>
          </div>
          <div className="w-11/12 m-auto">
            <h2 className="text-red-500 font-bold text-[1.3rem]">
              Liverpool Rate
            </h2>
            <div className="flex justify-center gap-4  w-3/4 border-[1px] p-2 rounded-lg mt-2 mb-2 m-auto">
              <div className="w-full mt-2 mb-2 flex flex-col justify-center gap-4">
                {ratings
                  .filter((ele) => !ele.etc)
                  .map((ele) => {
                    return (
                      <>
                        <div
                          className="flex flex-col items-center"
                          key={ele.pId}
                        >
                          <label htmlFor={ele.pId}>{ele.playerName}</label>
                          <input
                            type="text"
                            className="w-1/3 text-black text-center rounded-lg"
                            value={ele.rating}
                            onChange={(e) =>
                              ratingHandler(e.target.value, ele.pId)
                            }
                          ></input>
                        </div>
                      </>
                    );
                  })}
                {ratings
                  .filter((ele) => ele.etc)
                  .map((ele) => {
                    return (
                      <UpdateRatingSingle
                        key={ele.pId}
                        pId={ele.pId}
                        rating={ele.rating}
                        playerName={ele.playerName}
                        ratingHandler={ratingHandler}
                        setRatings={setRatings}
                      ></UpdateRatingSingle>
                    );
                  })}
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    className={updateButtonCss}
                    onClick={ratingPlusHandler}
                  >
                    <FaPlus size={20}></FaPlus>
                  </button>
                  <button
                    className={updateButtonCss}
                    type="button"
                    onClick={ratingMinusHandler}
                  >
                    <FaMinus size={20}></FaMinus>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mb-4 mt-8">
              <label htmlFor="desc" className="text-red-400 font-bold mb-4">
                Description
              </label>
              <textarea
                className="bg-slate-400 text-center text-black w-3/4 rounded-lg h-[25rem] p-1"
                id="desc"
                ref={matchDescRef}
                defaultValue={resData && resData?.rrData?.reportDescription}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {errorData &&
              errorData.map((ele) => {
                return (
                  <div className="text-red-500 font-bold" key={ele.path}>
                    {ele.msg}
                  </div>
                );
              })}
          </div>
          
          <div className="flex gap-2 justify-center mb-2">
          <button
              className={buttonTailwindCss}
              type="button"
              onClick={resetHandler}
            >
              Reset
            </button>
            <button
              className={buttonTailwindCss}
              type="button"
              onClick={submitHandler}
            >
              Submit
            </button>

          </div>
        </Form>
      </div>
    </>
  );
}

export default RatingUpdatePage;
