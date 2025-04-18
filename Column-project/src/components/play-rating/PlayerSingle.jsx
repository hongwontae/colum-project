import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function PlayerSingle({ rrId, title, reportDate, oppenent, reportDescription }) {
  return (
    <>
      <section className="border-[1px] w-3/5 pl-8 pr-8 pb-8 pt-4 rounded-md">
        <Link to={`/player-rating/result/${rrId}`}>
          <div className="font-bold text-red-600 text-2xl mb-4">{title}</div>
          <div className="flex justify-center gap-8 items-center w-full">
            <div className="w-1/2">
              <div className="text-red-500">{reportDate} - Rating</div>
              <div>{oppenent}</div>
            </div>
            <div className="overflow-hidden w-1/2">
              <div className="text-red-400">Description</div>
              <div className="whitespace-normal">{reportDescription}</div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
}

export default PlayerSingle;
