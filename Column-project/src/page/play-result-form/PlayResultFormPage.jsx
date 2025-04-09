import PlayResultForm from "../../components/play-result-form/PlayResultForm";
import { redirect, useLoaderData } from "react-router";

function PlayResultFormPage() {


  const loaderData = useLoaderData();
  console.log(loaderData);



  return (
    <div className="flex flex-col gap-4 mt-2">
      <h1 className="text-4xl text-red-500 font-bold">Play Result Form</h1>
      <PlayResultForm></PlayResultForm>
    </div>
  );
}

export default PlayResultFormPage;

export async function loader() {
  const response = await fetch("http://localhost:3000/play-result/auth/pr", {
    method: "POST",
    credentials: "include",
  });

  if(!response.ok){
    return redirect('/');
  }

  const resData = await response.json();
  console.log(resData);
  return null;

  
}

