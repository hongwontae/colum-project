/* eslint-disable react/prop-types */
import {buttonTailwindCss} from '../../util/public-button'

function PlayResultButtons({ resetHandler }) {
  return (
    <>
      <div className="mt-4 flex justify-center gap-4 mr-4 text-[1.2rem]">
        <button
          className={buttonTailwindCss}
          onClick={resetHandler}
          type="button"
        >
          Reset
        </button>
        <button className={buttonTailwindCss} type="submit">
          Submit
        </button>
      </div>
    </>
  );
}

export default PlayResultButtons;
