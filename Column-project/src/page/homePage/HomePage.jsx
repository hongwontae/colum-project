/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import HomeAllButton from "../../components/home/home-section/HomeAllButton";
import HomeSubButton from "../../components/home/home-section/HomeSubButton";
import LiverPoolIcon from "../../assets/images/liverpool-homepage-pirctures/LiverPool-Icon.png";
function HomePage() {


  return (
    <>
      <div className="flex justify-center gap-5">
        <h1 className="text-6xl font-bold text-red-500 m-0">
          LiverPool Column
        </h1>
        <img
          className="w-[80px] h-[80px] object-cover"
          src={LiverPoolIcon}
        ></img>
      </div>
      <div className="mt-5">
        <HomeAllButton></HomeAllButton>
        <HomeSubButton></HomeSubButton>
      </div>
    </>
  );
}

export default HomePage;

