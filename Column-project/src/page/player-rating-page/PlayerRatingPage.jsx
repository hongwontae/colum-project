/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router";
import PlayerRatingContainer from "../../components/player-rating/PlayerRatingContainer.jsx";
import Pagination from "../../components/play-result/Pagination.jsx";
import { PageCtx } from "../../context/PageContext.jsx";

function PlayerRatingPage() {
  const {resData : data, authData} = useLoaderData();
  const { setIsAuth } = useContext(PageCtx);

  console.log(data.items);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    if(authData.jStatus === false){
      setIsAuth(false);
    }
    if(authData.jStatus === true){
      setIsAuth(true)
    }
  }, [authData.jStatus, setIsAuth])

  return (
    <>
      <PlayerRatingContainer data={data.items}></PlayerRatingContainer>
      <Pagination
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        url="/player-rating?page="
      ></Pagination>
    </>
  );
}

export default PlayerRatingPage;

export async function pRatLoader({ request, params }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const [response, authResponse] = await Promise.all([
    fetch(`http://localhost:8080/rating/all?page=${page}`),
    fetch("http://localhost:8080/admin/credential", {
      method: "POST",
      credentials: "include",
    }),
  ]);

  if (!response.ok || ! authResponse.ok) {
    throw new Error("Failed Data");
  }

  const resData = await response.json();
  const authData = await authResponse.json();
  return {
    resData,
    authData
  };
}
