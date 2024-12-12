import { useStore } from "../../../zustand-store/HomePageStore";
import HomeButton from "../../../reusable-components/HomeButton";

function HomeAllButton() {
  const { allViewHandler, allDownHandler } = useStore();

  return (
    <>
      <div className="w-64 m-auto mb-10">
        <div className="flex justify-around">
          <HomeButton onClick={allViewHandler}>Click All View</HomeButton>
          <HomeButton onClick={allDownHandler}>Click All Down</HomeButton>
        </div>
      </div>
    </>
  );
}

export default HomeAllButton;
