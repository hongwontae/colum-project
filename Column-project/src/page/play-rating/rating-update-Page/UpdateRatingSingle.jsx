import { useState } from "react";

/* eslint-disable react/prop-types */
function UpdateRatingSingle({
  pId,
  playerName,
  rating,
  ratingHandler,
  setRatings,
}) {
  const [name, setName] = useState(false);

  function labelHandler() {
    setName(true);
  }

  function inputHandler(e, pId) {
    setName(false);
    if (!e) {
      return;
    }
    setRatings((prev) => {
      const copyArr = [...prev];
      const findObjectIndex = copyArr.findIndex((ele) => ele.pId === pId);
      const findObject = copyArr.find((ele) => ele.pId === pId);

      copyArr[findObjectIndex] = {
        ...findObject,
        playerName: e,
      };
      return copyArr;
    });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {name ? (
          <input
            className="text-center text-black"
            onBlur={(e) => inputHandler(e.target.value, pId)}
            type="text"
          ></input>
        ) : (
          <label onDoubleClick={labelHandler} htmlFor={pId}>
            {playerName}
          </label>
        )}
        <input
          type="text"
          className="w-1/3 text-black text-center rounded-lg"
          value={rating}
          onChange={(e) => ratingHandler(e.target.value, pId)}
        ></input>
      </div>
    </>
  );
}

export default UpdateRatingSingle;
