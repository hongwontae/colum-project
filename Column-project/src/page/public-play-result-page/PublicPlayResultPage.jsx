/* eslint-disable no-unused-vars */
import PlayResultContainer from "../../components/play-result/play-result-container/PlayResultContainer";
import { useEffect } from "react";
import Pagination from "../../components/play-result/Pagination";
import { useLoaderData } from "react-router";

function PlayResultPage() {
  const loadData = useLoaderData();
  console.log(loadData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mt-4">
        <PlayResultContainer allData={loadData.data}></PlayResultContainer>
        <Pagination
          url="/play-result?current="
          totalPage={loadData.total}
          currentPage={loadData.currentPage}
        ></Pagination>
      </div>
    </>
  );
}

export default PlayResultPage;

// eslint-disable-next-line react-refresh/only-export-components
export async function prLoader({ request, params }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  console.log(page);

  const response = await fetch(
    `http://localhost:3000/play-result/total/pr?current=${page}`,
    {
      method: "GET",
    }
  );

  return await response.json();
}
