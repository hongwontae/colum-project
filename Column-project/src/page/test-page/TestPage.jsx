import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";

function TestPage() {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Bold, Italic],
    content: "<p>Hello Tiptap!</p>",
  });

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
        </div>

        <EditorContent
          editor={editor}
          className="border p-4 rounded bg-white text-black"
        />
      </div>
    </>
  );
}

export default TestPage;
