/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import PlayerSingle from "./PlayerSingle";

function PlayerRatingContainer({ data }) {
  return (
    <>
      <div className="flex flex-col gap-4 items-center mb-4">
        {data.map((single) => {
          return (
              <PlayerSingle key={single.rrId} {...single}></PlayerSingle>
          );
        })}
      </div>
    </>
  );
}

export default PlayerRatingContainer;
