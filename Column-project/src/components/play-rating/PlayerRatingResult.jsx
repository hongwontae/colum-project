/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { PageCtx } from "../../context/PageContext";
import CustomModal from "../modal/CustomModal";

function PlayerRatingResult() {
  const { resData, authData } = useLoaderData();
  const { setIsAuth } = useContext(PageCtx);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  function ModalOpenHandler() {
    modalRef.current.showModal();
  }
  function ModalCloseHandler() {
    modalRef.current.close();
  }

  const { rrData, RPData } = resData;

  useEffect(() => {
    if (authData.jStatus === false) {
      setIsAuth(false);
    }
    if (authData.jStatus === true) {
      setIsAuth(true);
    }
  }, [setIsAuth, authData, navigate]);

  return (
    <>
      <CustomModal
        ref={modalRef}
        close={ModalCloseHandler}
        title={rrData.title}
        id={rrData.rrId}
        url={"rating"}
        path={"player-rating"}
      ></CustomModal>
      <article className="w-full">
        <h1 className="text-red-500 font-bold text-2xl mb-8">
          Rating - Report ({rrData.reportDate})
        </h1>
        <div className="flex justify-center w-full gap-4 p-8">
          <div className="border-[1px] pt-4 pb-4 w-1/3 rounded-lg h-full">
            <h2 className="mb-2 text-red-400 font-bold">Rating</h2>
            <div className="flex flex-col gap-2">
              {RPData.map((ele) => {
                return (
                  <div key={ele.rId}>
                    {ele.player.playerName} - {ele.rating}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-[1px] w-2/3 rounded-lg p-4">
            <div className="text-red-400 font-bold mb-4">Description</div>
            <p className="text-base break-words">{rrData.reportDescription}</p>
          </div>
        </div>
        {authData.jStatus ? (
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="border-[1px] rounded-lg p-1"
              onClick={() => navigate(`/player-rating/update/${rrData.rrId}`)}
            >
              Update
            </button>
            <button
              className="border-[1px] rounded-lg p-1"
              onClick={ModalOpenHandler}
            >
              Delete
            </button>
          </div>
        ) : null}
      </article>
    </>
  );
}

export default PlayerRatingResult;

export async function loader({ params }) {
  const id = params.id;

  const [authResponse, response] = await Promise.all([
    fetch("http://localhost:8080/admin/credential", {
      method: "POST",
      credentials: "include",
    }),
    fetch(`http://localhost:8080/rating/one/${id}`),
  ]);

  if (!authResponse.ok || !response.ok) {
    throw new Response(
      JSON.stringify({ message: "play-rating result http fail" }),
      { status: 404, statusText: "failed" }
    );
  }

  const authData = await authResponse.json();
  const resData = await response.json();
  return {
    authData,
    resData,
  };
}
