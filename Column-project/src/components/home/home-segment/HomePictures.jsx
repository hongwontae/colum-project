/* eslint-disable react/prop-types */

import React from "react";
import { liverpoolArr } from "../../../data/liverpoolImageData";
import HomePicture from "../home-picture-component/HomePicture";

function HomePictures({ toggle }) {
  return (
    <>
      {toggle && (
        <div className="flex flex-wrap justify-center gap-5 mb-5 w-full">
          {liverpoolArr.map((ele) => {
            return (
              <React.Fragment key={ele.id}>
                <HomePicture
                  src={ele.imagePath}
                  alt={ele.alt}
                  className="w-[22%] h-[200px] object-cover shadow-lg rounded-lg"
                ></HomePicture>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </>
  );
}

export default HomePictures;
