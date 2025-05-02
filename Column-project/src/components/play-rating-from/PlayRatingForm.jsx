import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";
import SelectSegment from "../play-result-form/SelectSegment";
import PlayRating from "./PlayRating";
import PlayRatingEditor from "./PlayRatingEditor";

function PlayRatingForm() {
  const [selectedData, setSelectedData] = useState("");

  const [player, setPlayer] = useState([]);
  console.log(player);

  useEffect(() => {
    async function getPlayer() {
      const response = await fetch("http://localhost:3000/play-rating/player", {
        method: "GET",
        credentials: "include",
      });

      const resData = await response.json();

      if (!response.ok) {
        return redirect("/");
      }

      return setPlayer(resData);
    }
    getPlayer();
  }, []);

  return (
    <>
      <Form className="border-[1px] p-4 w-8/12 rounded-lg m-auto mb-8">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-col items-center gap-1 w-full justify-center">
            <label
              htmlFor="title"
              className="text-red-400 font-bold text-[1.4rem]"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="text-black text-center rounded-lg w-2/4 p-[0.2rem] text-[1.2rem]"
            ></input>
          </div>

          <SelectSegment
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          ></SelectSegment>

          <div className="flex flex-col gap-2 w-full items-center">
            <label
              htmlFor="matchDay"
              className="text-red-400 font-bold text-[1.4rem]"
            >
              Match Day
            </label>
            <input
              type="date"
              id="matchDay"
              name="date"
              className="text-black rounded-lg w-1/2 h-8 m-auto text-center text-[1.2rem]"
            ></input>
          </div>

          <PlayRatingEditor></PlayRatingEditor>

          <div>
            <PlayRating player={player} setPlayer={setPlayer}></PlayRating>
          </div>
        </div>
      </Form>
    </>
  );
}

export default PlayRatingForm;

export async function PlayRatingFormLoader() {
  // const response = await fetch('http://localhost:3000/play-rating/player', {
  //   method : 'GET',
  //   credentials : 'include'
  // });
  // const resData = response.json();
  // if(!response.ok){
  //   return redirect('/')
  // }
  // return resData;
}
