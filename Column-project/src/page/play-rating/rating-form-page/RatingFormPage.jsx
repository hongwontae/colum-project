import { useContext, useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import SelectSegment from "../../../components/play-result-form/SelectSegment";
import { PageCtx } from "../../../context/PageContext";
import { buttonTailwindCss } from "../../../util/public-button";

function RatingFormPage() {
  const { authData, resData } = useLoaderData();
  const [ratings, setRatings] = useState([...resData.start, ...resData.sub]);
  const acData = useActionData();
  const [errorData, setErrorData] = useState([]);
  const { setIsAuth } = useContext(PageCtx);
  const [selectedData, setSelectedData] = useState("맨체스터 시티");
  const titleRef = useRef(null);
  const dayRef = useRef(null);
  const descRef = useRef(null);
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (authData?.jStatus === false) {
      setIsAuth(false);
      navigate("/");
    }
    if (authData?.jStatus === true) {
      setIsAuth(true);
    }
  }, [authData?.jStatus, navigate, setIsAuth]);
  useEffect(()=>{
    if(acData?.status === false){
      setErrorData(acData?.validatorResult);
    }
  }, [acData?.status, acData?.validatorResult])

  function ratingHandler(value, pId) {
    if (isNaN(value) || value > 9) {
      return;
    }

    setRatings((prev) => {
      const copyArr = [...prev];
      const selectedObject = copyArr.find((ele) => ele.pId === pId);
      const selectedIndex = copyArr.findIndex((ele) => ele.pId === pId);

      copyArr[selectedIndex] = {
        ...selectedObject,
        rating: value,
      };
      return copyArr;
    });
  }
  function submitHandler() {
    const ratingPostData = {
      title: titleRef.current.value,
      day: dayRef.current.value,
      matchDesc: descRef.current.value,
      matchTeam: selectedData,
      ratings: JSON.stringify(ratings),
    };

    submit(ratingPostData, {
      method: "POST",
    });
  }

  function resetHandler() {
    titleRef.current.value = null;
    dayRef.current.value = null;
    descRef.current.value = null;
    setSelectedData("맨체스터 시티");
    setRatings((prev) => {
      const copyArr = [...prev];
      const ratingZeroArr = copyArr.map((ele) => {
        return {
          ...ele,
          rating: "",
        };
      });
      return ratingZeroArr;
    });
    setErrorData([]);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-red-500 font-bold text-2xl mb-4">
          Player Rating Form
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
              ref={dayRef}
              id="day"
            ></input>
          </div>
          <div className="flex justify-center">
            <SelectSegment
              selectedData={selectedData}
              setSelectedData={setSelectedData}
            ></SelectSegment>
          </div>

          <div className="w-11/12 m-auto">
            <h2 className="text-red-500 font-bold text-[1.3rem]">
              Liverpool Rate
            </h2>
            <div className="flex justify-center gap-4 w-3/4 border-[1px] p-2 rounded-lg mt-2 mb-2 m-auto">
              <div className="w-1/2 mt-2 mb-2 flex flex-col justify-center gap-4">
                {ratings
                  .filter((ele) => ele.start_bol === true)
                  .map((ele) => {
                    return (
                      <>
                        <div
                          key={ele.pId}
                          className="flex flex-col items-center"
                        >
                          <label htmlFor={ele.pId}>{ele.playerName}</label>
                          <input
                            type="text"
                            className="w-1/3 text-black text-center rounded-lg"
                            value={ele.rating}
                            onChange={(e) =>
                              ratingHandler(+e.target.value, ele.pId)
                            }
                          ></input>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="w-1/2 mt-2 mb-2 flex flex-col gap-4">
                {ratings
                  .filter((ele) => ele.start_bol === false)
                  .map((ele) => {
                    return (
                      <>
                        <div
                          key={ele.pId}
                          className="flex flex-col items-center"
                        >
                          <label htmlFor={ele.pId}>{ele.playerName}</label>
                          <input
                            type="text"
                            className="w-1/3 text-black text-center rounded-lg"
                            value={ele.rating}
                            onChange={(e) =>
                              ratingHandler(+e.target.value, ele.pId)
                            }
                          ></input>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <label htmlFor="desc" className="text-red-400 font-bold">
              Description
            </label>
            <textarea
              className="bg-slate-400 text-center text-black w-3/4 rounded-lg h-[25rem] p-1"
              id="desc"
              ref={descRef}
            ></textarea>
          </div>
          <div className="mb-1 flex flex-col justify-center gap-2 ">
            {errorData && errorData.map(ele=>{
              return <div className="text-red-500 font-bold" key={ele.path}>{ele.msg}</div>
            })}
          </div>
          <div className="mb-4">
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

export default RatingFormPage;
