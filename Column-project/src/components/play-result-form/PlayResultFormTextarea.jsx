/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function PlayResultFormTextarea({text, setText, quillRef}) {
  console.log({text: text, setText : setText, q : quillRef})

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        
        editor.insertEmbed(range.index, "image", data.secure_url);
      } catch (err) {
        alert("이미지 업로드 실패");
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [1, 2, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
        [{ align: [] }],
        ["code-block"],
        [{ color: [] }, { background: [] }],
        ["custom-image"], // 커스텀 버튼
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={text}
        onChange={(value)=>setText(value)}
        modules={modules}
      />
    </>
  );
}

export default PlayResultFormTextarea;
