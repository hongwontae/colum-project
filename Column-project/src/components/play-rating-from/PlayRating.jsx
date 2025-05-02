/* eslint-disable react/prop-types */
function PlayRating({ player, setPlayer }) {
  function ratingHandler(idx, rating) {
    setPlayer((prev) => {
      const prevState = [...prev];
      prevState[idx - 1] = { ...prevState[idx - 1], rating };
      return prevState;
    });
  }

  return (
    <>
      <h1 className="text-red-400 font-bold text-[1.4rem] mb-4">Rating</h1>
      <div className="flex justify-center gap-8 text-[1.2rem] text-white w-full">
        <div>
          {player?.map((ele) => {
            if (ele.player_id < 12) {
              return (
                <>
                  <div className="flex gap-2 mb-1 w-full" key={ele.player_id}>
                    <label
                      className="w-1/2"
                      htmlFor={ele.player_name}
                    >
                      {ele.player_name}
                    </label>
                    <input
                      id={ele.player_name}
                      onChange={(e) =>
                        ratingHandler(ele.player_id, e.target.value)
                      }
                      type="number"
                      className="text-center text-black rounded-lg"
                    ></input>
                  </div>
                </>
              );
            }
          })}
        </div>
        <div>
          {player?.map((ele) => {
            if (ele.player_id >= 13) {
              return (
                <>
                  <div className="flex gap-2 mb-1 w-full" key={ele.player_id}>
                    <label
                      className="w-1/2"
                      htmlFor={ele.player_name}
                    >
                      {ele.player_name}
                    </label>
                    <input
                      id={ele.player_name}
                      onChange={(e) => {
                        ratingHandler(ele.player_id, e.target.value);
                      }}
                      type="number"
                      className="text-center text-black rounded-lg"
                    ></input>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default PlayRating;
