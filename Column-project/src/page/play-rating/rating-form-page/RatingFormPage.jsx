import PlayRatingForm from "../../../components/play-rating-from/PlayRatingForm";

function RatingFormPage() {


  return (
    <>
      <div className="flex flex-col gap-4 mt-2">
        <h1 className="text-4xl text-red-500 font-bold">Play Rating Form</h1>
        <PlayRatingForm></PlayRatingForm>
      </div>
    </>
  );
}

export default RatingFormPage;
