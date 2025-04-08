/* eslint-disable no-unused-vars */
import PlayResultContainer from "../../components/play-result/play-result-container/PlayResultContainer";
import {useEffect } from "react";
import Pagination from "../../components/play-result/Pagination";

function PlayResultPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PlayResultContainer></PlayResultContainer>
      <Pagination
        url="/play-result?page="
      ></Pagination>
    </> 
  );
}

export default PlayResultPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function prLoader({ request, params }) {

}
