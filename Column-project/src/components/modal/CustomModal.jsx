/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { forwardRef, useState } from "react";
import { useNavigate } from "react-router";

const CustomModal = forwardRef(function CustomModal({ close, title, id, url, path }, ref) {
  const navigate = useNavigate();

  const [errorData, setErrorData] = useState(null);
  async function deleteHandler() {
    const response = await fetch(
      `http://localhost:8080/${url}/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: `${url} delete http failed` }),
        { status: 404, statusText: "failed" }
      );
    }

    const resData = await response.json();

    console.log(resData);

    if (resData.status == true) {
      return navigate(`/${path}?page=1`);
    } else if (resData.status == false) {
      setErrorData(resData.message);
    }
  }

  function closeHandler() {
    setErrorData(null);
    close();
  }

  return (
    <>
      <dialog ref={ref} onClose={closeHandler} className="w-72 rounded-lg pt-8 pr-8 pl-8 pb-4">
        <h1 className="font-bold mb-4">Do you want to delete {title} - result?</h1>
        <div className="text-red-500 font-bold mt-2 mb-2">
          {errorData && errorData}
        </div>
        <div className="flex flex-row justify-end gap-4">
          <button
            onClick={closeHandler}
            className="border-[1px] rounded-lg border-black p-1"
          >
            Back
          </button>
          <button
            className="border-[1px] rounded-lg border-black p-1"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
});

export default CustomModal;
