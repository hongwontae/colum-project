import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import { useRef, useState } from "react";
import EditorModal from "./EditorModal";

function TestPage() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Underline,
      Bold,
      Italic,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: { class: "text-blue-500 underline" },
      }),
    ],
    content: "<p>Hello Tiptap!</p>",
  });
  const [toggle, setToggle] = useState(false);
  const titleRef = useRef();
  const urlRef = useRef();

  function linkClickHandler(){
    setToggle(prev=>!prev)
  }

  return (
    <>
      <div className="w-1/2 mx-auto mt-10 text-white">
        <div className="flex gap-2 mb-4 bg-gray-800 p-2 rounded-md justify-center">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-700"
            }`}
          >
            Bold
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-gray-700"
            }`}
          >
            Italic
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1 rounded ${
              editor.isActive("underline")
                ? "bg-blue-500 text-white"
                : "bg-gray-700"
            }`}
          >
            Underline
          </button>

          <button
            className={`px-3 py-1 rounded ${
              toggle ? "bg-blue-500 text-white" : "bg-gray-700"
            }`}
            onClick={linkClickHandler}
          >
            Link 추가/수정
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="border p-4 rounded bg-white text-black"
        />
      </div>
      {toggle ? <EditorModal titleRef={titleRef} urlRef={urlRef}></EditorModal> : null}
    </>
  );
}

export default TestPage;
