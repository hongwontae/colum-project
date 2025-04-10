/* eslint-disable no-unused-vars */
import { Form, redirect, useActionData, useSubmit } from "react-router-dom";
import ImagePicker from "../image-picker/ImagePicker";
import { useEffect, useRef, useState } from "react";
import SelectSegment from "./SelectSegment";
import PlayResultButtons from "./PlayResultButtons";
import PlayResultFormTextarea from './PlayResultFormTextarea';

function PlayResultFormPage() {
  const [previewImage, setPreviewImage] = useState(null);
  const [pickImage, setPickImage] = useState(null);
  const [selectedData, setSelectedData] = useState('맨체스터 시티');
  const [text, setText] = useState("");

  const submit = useSubmit();


  const acData = useActionData();
  const [acError, setAcError] = useState([])

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const matchDayRef = useRef(null);
  const myTeamScoreRef = useRef(null);
  const opTeamRef = useRef(null);
  const quillRef = useRef();
  


  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("file", pickImage);
    formData.append('match_team', selectedData)
    submit(formData, {
      method: "POST",
      action: "/play-result-form",
      encType: "multipart/form-data",
    });
  }

  function resetHandler() {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    matchDayRef.current.value = "";
    myTeamScoreRef.current.value = "";
    opTeamRef.current.value = "";
    setPreviewImage(null);
    setPickImage(null);
    setSelectedData("맨체스터 시티")
    setAcError([]);
  }

  useEffect(()=>{
    if(acData){
      setAcError(acData?.validatorResult)
    }
  }, [acData])


  return (
    <>
      <Form
        onSubmit={submitHandler}
        className="border-[1px] p-4 w-8/12 rounded-lg m-auto mb-8"
      >
        < div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-1 w-full justify-center">
            <label htmlFor="title" className="text-red-400 font-bold text-[1.4rem]">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              ref={titleRef}
              className="text-black text-center rounded-lg w-2/4 p-[0.2rem] text-[1.2rem]"
            ></input>
          </div>

          <SelectSegment selectedData={selectedData} setSelectedData={setSelectedData}></SelectSegment>
          <div className="flex flex-col gap-2 w-full items-center">
            <label htmlFor="matchDay" className="text-red-400 font-bold text-[1.2rem]">Match Day</label>
            <input
              type="date"
              id="matchDay"
              name="date"
              ref={matchDayRef}
              className="text-black rounded-lg w-1/2 h-8 m-auto text-center text-[1.2rem]"
            ></input>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="myScore" className="mb-4 text-red-400 font-bold text-[1.4rem]">Score</label>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <label className="text-red-600 font-bold w-full text-[1.3rem]">My Score</label>
                <input
                  type="number"
                  id="myScore"
                  name="my_score"
                  ref={myTeamScoreRef}
                  min={0}
                  className="text-black text-center rounded-sm text-2xl"
                ></input>
              </div>
              <div className="flex gap-6">
                <label htmlFor="opScore" className="font-bold text-[1.3rem] text-red-400">Opposing Score</label>
                <input
                  type="number"
                  className="text-black text-center rounded-sm text-2xl" 
                  id="opScore"
                  name="op_score"
                  min={0}
                  ref={opTeamRef}
                ></input>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full items-center">
            <label htmlFor="description" className="text-red-400 font-bold text-[1.4rem]">Description</label>
            <PlayResultFormTextarea quillRef={quillRef} setText={setText} text={text}></PlayResultFormTextarea>
            {/* <textarea
              type="text"
              ref={descriptionRef}
              id="description"
              name="play_description"
              className="w-11/12 h-[25rem] text-black text-center rounded-lg p-2 bg-slate-400 text-[1.4rem]"
            ></textarea> */}
          </div>
          <div className="flex justify-center">
            <ImagePicker
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              pickImage={pickImage}
              setPickImage={setPickImage}
            ></ImagePicker>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-red-500 font-bold">
          {acError && acError.map(ele=>{
            return <div key={ele.path}>{ele.msg}</div>
          })}
        </div>
        <PlayResultButtons resetHandler={resetHandler}></PlayResultButtons>
      </Form>
    </>
  );
}

export default PlayResultFormPage;

export async function prAction({ request, params }) {
  const formData = await request.formData();

  const response = await fetch("http://localhost:3000/play-result/register", {
    method: "POST",
    body: formData,
    credentials : 'include'
  });

  if (!response.ok) {
    throw new Error("Erorror");
  }

  const resData = await response.json();
  console.log(resData);
  return redirect('/public/play-result?current=1')

}
