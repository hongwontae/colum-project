import { createElement, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/imageResize", ImageResize);

function TestPage() {
  const quillRef = useRef(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [editorHtml, setEditorHtml] = useState('')

  async function toBase64(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();

      reader.onload = ()=>{
        resolve(reader.result)
      }

      reader.onerror = ()=>{
        reject();
      }
      reader.readAsDataURL(file)

    })
  }

  async function imageHandler(){
    const input = document.createElement('input');
    input.type = 'file';
    input.type = 'image/*';
    input.click();

    input.onchange = async ()=>{
      if(input.files && input.files[0]){
        const file = input.files[0];
        const base64 = await toBase64(file);

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        if(range){
          editor.insertEmbed(range.index, 'image', base64);
          editor.setSelection(range.index+1);
        }

        setImageFiles((prev)=>{
          return {
            ...prev,
            file
          }
        })

      }
    }
    
  }


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
        />
        <button className="text-[4rem]" onClick={() => console.log(editorHtml)}>
          저장
        </button>
      </div>
    </>
  );
}

export default TestPage;
