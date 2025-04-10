/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router";

function PlayResult() {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return (
    <>
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center border-[1px] rounded-md pt-4 pr-8 pl-8 pb-10 gap-5 w-3/5 max-sm:w-10/12 max-lg:w-11/12 max-mx:w-9/12">
          <h1 className="text-red-500 text-5xl font-bold mt-2">
            {loaderData.title}
          </h1>
          <div className="flex gap-4 items-center justify-center w-full">
            <img
              className="w-2/3 h-[20rem] rounded-lg object-fill "
              src={loaderData.image_secure_url}
              alt={loaderData.image_filename}
            ></img>
            <div className="flex flex-col gap-2 w-1/3 ">
              <div className="text-red-500 font-bold text-3xl">Summary</div>
              <div className="flex flex-col gap-4 border-[1px] p-6 rounded-lg">
                <div className="text-red-500 font-bold text-2xl">{loaderData.date.split('T')[0]}</div>
                <div className="text-red-500 font-bold text-2xl">리버풀 vs {loaderData.match_team}</div>
                <div className="text-red-500 font-bold text-2xl">
                  {loaderData.my_score} :{" "}
                  {loaderData.op_score}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-11/12">
            <p className="text-base break-words whitespace-pre-line text-[1.7rem] text-white">
              {loaderData.play_description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayResult;

export async function resultOneLoader({ request, params }) {
    const url = new URL(request.url);
    const id = url.pathname.split('/');
    
    const response = await fetch(`http://localhost:3000/play-result/one/pr/${id[3]}`);

    const resData = await response.json();

    return resData;

}
