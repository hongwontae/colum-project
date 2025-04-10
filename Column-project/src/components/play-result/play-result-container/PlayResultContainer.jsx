/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PlayResultSingle from "../play-result-single/PlayResultSingle";

 function PlayResultContainer({ allData }) {
  return (
    <>
      <section>
        <ul className="flex flex-row items-center gap-6 mb-6 ml-8 mr-8">
          {allData.map((ele) => {
            return (
              <>
                <PlayResultSingle key={ele.play_result_id} {...ele}></PlayResultSingle>
              </>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default PlayResultContainer;
