import React, { createRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../css/rich-editor.css";

const modules = {
   toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: "center" }],
      ["link", "image"],
   ],
};

const RichEditorEdit = ({ handleInput, content }) => {
   return (
      <ReactQuill
         theme="snow"
         value={content}
         onChange={handleInput}
         className="editor-input"
         modules={modules}
         placeholder="write here..."
      />
   );
};

export default RichEditorEdit;
