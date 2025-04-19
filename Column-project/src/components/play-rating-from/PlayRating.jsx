/* eslint-disable react/prop-types */
function PlayRating({ player, setPlayer }) {
  function ratingHandler(idx, rating) {
    setPlayer((prev) => {
      const prevState = [...prev];
      prevState[idx-1] = {...prevState[idx-1], rating}
      return prevState

    });
  }

  return (
    <>
      <h1 className="text-red-400 font-bold text-[1.4rem] mb-4">Rating</h1>
      <div className="flex justify-center gap-8 text-[1.2rem] text-white">
        <div>
          {player?.map((ele) => {
            if (ele.player_id < 12) {
              return (
                <>
                  <div className="flex gap-2 mb-1 w-full">
                    <label className="w-1/2" key={ele.player_id}>
                      {ele.player_name}
                    </label>
                    <input
                      onChange={(e) =>
                        ratingHandler(
                          ele.player_id,
                          e.target.value,
                        )
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
                  <div className="flex gap-2 mb-1 w-full">
                    <label className="w-1/2" key={ele.player_id}>
                      {ele.player_name}
                    </label>
                    <input
                    onChange={(e)=>{
                      ratingHandler(ele.player_id, e.target.value)
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
