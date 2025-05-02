/* eslint-disable react/prop-types */
function EditorModal({ titleRef, urlRef }) {
  return (
    <>
      <dialog open>
        <div>
          <label>Title</label>
          <input ref={titleRef} type="text"></input>
        </div>
        <div>
          <label>URL</label>
          <input ref={urlRef} type="text"></input>
        </div>
        <button
          type="button"
          onClick={() =>
            console.log(titleRef.current.value, urlRef.current.value)
          }
        >
          Submit
        </button>
      </dialog>
    </>
  );
}

export default EditorModal;
