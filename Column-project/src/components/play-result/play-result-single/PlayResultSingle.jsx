/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { dateTransformat } from "../../../util/date-formatted";
import { memo } from "react";
function PlayResultSingle(props) {

  console.log('play-result-single')

  const newFormattedDate = dateTransformat(props.date);
  return (
    <>
      <div className="w-9/12 border-[1px] rounded-lg h-[10rem] max-sm:w-11/12">
        <Link
          to={`/play-result/${props.playId}`}
          className="flex flex-col items-center w-full h-full"
        >
          <li className="flex justify-center items-center w-full h-full">
            <img
              src={`http://localhost:8080/uploads/${props.imagePath}`}
              alt={props.imagePath}
              className="w-[25rem] h-full rounded-lg object-fill"
            ></img>

            <div className="flex flex-col w-full justify-center items-center h-full gap-4 overflow-hidden">
              <h2 className="text-red-500 font-bold text-[1.2rem]">{props.title}</h2>
              <div className="text-zinc-300">{newFormattedDate}</div>
              <p className="break-words h-1/3">{props.playDescription}</p>
            </div>
          </li>
        </Link>
      </div>
    </>
  );
}

export default PlayResultSingle;
