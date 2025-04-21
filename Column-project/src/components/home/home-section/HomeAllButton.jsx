import { useStore } from "../../../zustand-store/home-page-store";
import HomeButton from "../../../reusable-components/HomeButton";

function HomeAllButton() {
  const { allViewHandler, allDownHandler } = useStore();

  return (
    <>
      <div className="w-64 m-auto mb-10 text-[1.5rem]">
        <div className="flex justify-around">
          <HomeButton onClick={allViewHandler}>Click All View</HomeButton>
          <HomeButton onClick={allDownHandler}>Click All Down</HomeButton>
        </div>
      </div>
    </>
  );
}

export default HomeAllButton;
