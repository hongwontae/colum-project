/* eslint-disable no-unused-vars */
import { json, useLoaderData } from "react-router";
import PlayResultContainer from "../../components/play-result/play-result-container/PlayResultContainer";
import { useContext, useEffect, useRef } from "react";
import Pagination from "../../components/play-result/Pagination";
import {PageCtx} from '../../context/PageContext'

function PlayResultPage() {
  const {resData : data, authData : ad} = useLoaderData();

  const {setIsAuth} = useContext(PageCtx);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    if(ad.jStatus === false){
      setIsAuth(false)
    }
    if(ad.jStatus === true){
      setIsAuth(true)
    }
  }, [ad.jStatus, setIsAuth])


  return (
    <>
      <PlayResultContainer allData={data.items}></PlayResultContainer>
      <Pagination
        totalPage={data.totalPages}
        currentPage={data.currentPage}
        url="/play-result?page="
      ></Pagination>
    </> 
  );
}

export default PlayResultPage;

export async function prLoader({ request, params }) {
  console.log('loader');
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const [response, authResponse] = await Promise.all([
    fetch(`http://localhost:8080/play-result/result?page=${page}`),
    fetch("http://localhost:8080/admin/credential", {
      method: "POST",
      credentials: "include",
    }),
  ]);

  if (!response.ok || !authResponse.ok) {
    throw json(
      { message: "play-result page http failed" },
      { status: 404, statusText: "fail" }
    );
  }

  const resData = await response.json();
  const authData = await authResponse.json();

  return {
    resData,
    authData,
  };
}
