import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
  generateTableHTML,
} from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Button } from "@mui/material";

function Editor({ eventDescription, setEventDescription }) {
  const [value, setValue] = useState(eventDescription);
  const quillRef = useRef();

  // Initialize the Quill editor
  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      //   if (quill) {
      //     quill.getModule("toolbar").addHandler("table", () => {
      //       insertTable(quill);
      //     });
      //   }
      let tableModule = quill.getModule("better-table-plus");
      console.log(tableModule);
      // tableModule.insertTable(3, 3);
    }
  };

  const insertTable = (quill) => {
    const cursorPosition = quill.getSelection().index;
    const tableHTML = generateTableHTML();
    quill.clipboard.dangerouslyPasteHTML(cursorPosition, tableHTML);
    quill.setSelection(cursorPosition);
  };

  return (
    <>
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        // onChange={setValue}
        placeholder="Enter"
        modules={modules(createTable)}
        formats={formats}
      />
      <div id="editor"></div>
      <button id="insert-tables">TEST</button>
      <Button
        onClick={() => {
          console.log(quillRef.current.getEditor());
        }}
      >
        Save
      </Button>
    </>
  );
}

export default Editor;
