import { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

function TestPage() {
  const quillRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [editorHtml, setEditorHtml] = useState('')

  console.log(imageFiles);
  console.log(editorHtml)

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

              const fileId = `${file.name}_${file.size}_${file.lastModified}`;
              file._id = fileId;

              const base64 = reader.result;
              const range = quill.getSelection(true);
              const imageTag = `<img src="${base64}" data-id="${fileId}" />`;
              quill.clipboard.dangerouslyPasteHTML(range.index, imageTag);
              // 각 파일마다 고유한 id를 추가함
              setImageFiles((prev) => [...prev, file]);
            };
            reader.readAsDataURL(file);
          }
        };
      });
    }
  }, []);

  useEffect(()=>{
    if(quillRef.current){
      const quill = quillRef.current.getEditor();

      quill.clipboard.addMatcher('img', (node, delta)=>{
        const dataId = node.getAttributes('data-id');
      })

      quill.on('text-change', ()=>{
        const html = quill.root.innerHTML;
        console.log(html)
        setEditorHtml(html);

        const currentImageIds = Array.from(quill.root.querySelectorAll('img'))
        console.log(currentImageIds[0].getAttribute('data-id'))

        // currentImageIds ? setImageFiles((prev)=>{
        //   return prev.filter(file => {
        //     return currentImageIds.includes(file._id);
        //   })
        // }) : null

      })
    }
  }, [])



  return (
    <>
      <div className="w-3/5 m-auto mt-10">
        <ReactQuill
          ref={quillRef}
          value={editorHtml}
          className="text-black bg-white rounded-lg h-[20rem]"
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
