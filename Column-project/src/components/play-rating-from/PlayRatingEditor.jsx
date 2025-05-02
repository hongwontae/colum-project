import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent(),
      dataId: {
        default: null,
        parseHTML: (ele) => {
          return ele.getAttribute("data-id");
        },
        renderHTML: (attr) => {
          if (attr.dataId) {
            return;
          }
          return {
            "data-id": attr.dataId,
          };
        },
      },
      width: {
        default: "60%",
        parseHTML: (ele) => ele.getAttribute("width"),
        renderHTML: (attr) => {
          return {
            width: attr.width,
          };
        },
      },
    };
  },
});

function PlayRatingEditor() {
  const editor = useEditor({
    extensions: [StarterKit, CustomImage],
  });

  return (
    <>
      <div className="w-full text-white">
        <h3 className="text-red-400 font-bold text-[1.4rem] mb-1">
          Description
        </h3>
        <div className="flex flex-row justify-end w-10/12 mb-2">
          <button
            className="border-[1px] rounded-lg p-1 text-[1.1rem]"
            type="button"
            onClick={()=>{
              editor.chain().focus().toggleBold().run()
            }}
          >
            Bold
          </button>
        </div>
        <EditorContent
          className="m-auto w-10/12 border-[1px] rounded-lg h-[25rem]"
          editor={editor}
        ></EditorContent>
      </div>
    </>
  );
}

export default PlayRatingEditor;
