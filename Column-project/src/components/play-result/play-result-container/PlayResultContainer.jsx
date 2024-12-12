/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {memo} from 'react';
import PlayResultSingle from "../play-result-single/PlayResultSingle";

 function PlayResultContainer({ allData }) {

  console.log('play-result-container')

  return (
    <>
      <section>
        <ul className="flex flex-col items-center gap-6 mb-6 ml-8 mr-8">
          {allData.map((ele) => {
            return (
              <>
                <PlayResultSingle key={ele.id} {...ele}></PlayResultSingle>
              </>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default PlayResultContainer;
