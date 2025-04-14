/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { tropiesImageArr } from "../../../data/tropiesImageData";
import HomePicture from "../home-picture-component/HomePicture";

function HomeTropies({ toggle }) {

  useEffect(()=>{
    tropiesImageArr.forEach((ele)=>{
      const img = new Image();
      img.src = ele.imagePath;
    })
  }, [])


  return (
    <>
      <div className="mb-14">
        {toggle && (
          <> 
            <div className="flex justify-center gap-5 flex-wrap w-full">
              {tropiesImageArr.map((ele) => {
                return (
                  <>
                    <React.Fragment key={ele.id}>
                      <HomePicture
                        src={ele.imagePath}
                        alt={ele.alt}
                        className="w-[22%] h-[200px] object-cover shadow-lg rounded-lg"
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
