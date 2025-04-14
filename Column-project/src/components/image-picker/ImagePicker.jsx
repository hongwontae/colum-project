/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import classes from "./ImagePicker.module.css";

function ImagePicker({
  previewImage,
  setPreviewImage,
  setPickImage,
  notification,
}) {
  const imageInputRef = useRef(null);

  function imageHandler() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPreviewImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreviewImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  function imageGetHandler(e) {
    setPickImage(e.target.files[0]);
  }


  return (
    <>
      <div className={classes.picker}>
        <label className="text-red-400 font-bold text-[1.4rem]">Image Thumbnail</label>
        <div className={classes.control}>
          <div className={classes.preview}>
            {!previewImage && (
              <>
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="text-[1.4rem]">No Image picked yet</div>
                  <div>{notification || null}</div>
                </div>
              </>
            )}
            {previewImage && (
              <img
                src={previewImage}
                alt="The Image"
                className="w-full h-full object-cover"
              ></img>
            )}
          </div>
          <input
            className={classes.input}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={imageInputRef}
            onChange={(e) => {
              handleImageChange(e);
              imageGetHandler(e);
            }}
          ></input>
          <div className="flex justify-center gap-4 mt-2 text-[1.2rem]">
            <button
              onClick={imageHandler}
              className={classes.button}
              type="button"
            >
              Pick an Image
            </button>
            <button
              type="button"
              onClick={() => {
                setPreviewImage(null);
                setPickImage(null);
              }}
              className="cursor-pointer bg-[#a4abb9] rounded-sm p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImagePicker;
