/* eslint-disable react/prop-types */

import React from "react";
import { tropiesImageArr } from "../../../data/tropiesImageData";
import HomePicture from "../home-picture-component/HomePicture";

function HomeTropies({ toggle }) {
  return (
    <>
      <div className="mb-14">
        {toggle && (
          <>
            <div className="flex justify-center gap-5 flex-wrap">
              {tropiesImageArr.map((ele) => {
                return (
                  <>
                    <React.Fragment key={ele.id}>
                      <HomePicture
                        src={ele.imagePath}
                        alt={ele.alt}
                        className="w-[300px] h-[200px] object-cover shadow-lg rounded-lg"
                      ></HomePicture>
                    </React.Fragment>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default HomeTropies;
