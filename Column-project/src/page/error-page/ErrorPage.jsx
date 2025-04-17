import { useRouteError } from "react-router";
import MainNavigation from "../../components/navigation/MainNavigation";

function ErrorPage() {
  const errorData = useRouteError();
  console.log(errorData);

  return (
    <div className="bg-slate-800 min-h-screen font-roboto text-center flex flex-col text-zinc-100">
      <div>
        <MainNavigation></MainNavigation>
      </div>
        <h1 className="font-bold text-4xl mb-6 text-red-500">Error Occurred!</h1>
        <p className="mt-2 text-2xl text-red-400 font-sans">
          상단의 내비게이션을 사용해서 벗어나주시고 다시 시도해주세요
        </p>
    </div>
  );
}

export default ErrorPage;
