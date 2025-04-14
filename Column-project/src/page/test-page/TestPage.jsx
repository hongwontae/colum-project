import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TestPage() {
  const quillRef = useRef(null);
  const [editorHtml, setEditorHtml] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  console.log(imageFiles);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");

      toolbar.addHandler("image", () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.setAttribute("multiple", true);
        input.click();

        input.onchange = () => {
          const file = input.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result;
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "image", base64);
              setImageFiles((prev) => [...prev, file]);
            };
            reader.readAsDataURL(file);
          }
        };
      });
    }
  }, []);

  function handleChange(value) {
    setEditorHtml(value);
  }

  return (
    <>
      <div className="w-3/5 m-auto mt-10">
        <ReactQuill
          ref={quillRef}
          value={editorHtml}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
            ],
            imageResize: {
              modules: ["Resize", "DisplaySize", "Toolbar"], // 필요에 따라 선택
            },
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "image",
            "code-block",
          ]}
          theme="snow"
        />
        <button className="text-[4rem]" onClick={() => console.log(editorHtml)}>
          저장
        </button>
      </div>
    </>
  );
}

export default TestPage;
