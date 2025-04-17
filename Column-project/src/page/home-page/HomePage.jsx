/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import HomeAllButton from "../../components/home/home-section/HomeAllButton";
import HomeSubButton from "../../components/home/home-section/HomeSubButton";
function HomePage() {

  return (
    <>
      <div className="flex justify-center gap-5">
        <h1 className="text-[4rem] font-bold text-red-500 m-0">
          LiverPool Column
        </h1>
        <img
          className="w-[100px] h-[100px] object-cover"
          src={'https://res.cloudinary.com/doxscmwgl/image/upload/w_150,h_150,c_fill,f_auto,q_auto/LiverPool-Icon_uhivxt.png'}
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

