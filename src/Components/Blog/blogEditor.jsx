import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import PropTypes from "prop-types";
import Header from "@editorjs/header";
import "./EditorStyle.css";

const Editor = ({ title, desc }) => {
  const titleEditorId = useRef(
    `editor-title-${Math.random().toString(36).substr(2, 9)}`
  );
  const descEditorId = useRef(
    `editor-desc-${Math.random().toString(36).substr(2, 9)}`
  );
  const titleEditorRef = useRef(null);
  const descEditorRef = useRef(null);

  const headingToolConfig = {
    class: Header,
    config: {
      placeholder: "ادخل عنوانا",
      levels: [2, 3, 4],
      defaultLevel: 3,
    },
    shortcut: "SHIFT+H",
    toolbox: {
      title: "عنوان",
    },
  };

  const getDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? "rtl" : "ltr";
  };

  useEffect(() => {
    if (title && title.blocks.length > 0) {
      const titleDirection = getDirection(title.blocks[0].data.text);
      const titleEditor = new EditorJS({
        holder: titleEditorId.current,
        readOnly: true,
        tools: {
          header: headingToolConfig,
        },
        data: {
          blocks: title.blocks,
        },
      });

      titleEditorRef.current = titleEditor;
      document.getElementById(titleEditorId.current).dir = titleDirection;
    }

    if (desc && desc.blocks.length > 0) {
      const descDirection = getDirection(desc.blocks[0].data.text);
      const descEditor = new EditorJS({
        holder: descEditorId.current,
        readOnly: true,
        tools: {
          header: headingToolConfig,
        },
        data: {
          blocks: desc.blocks,
        },
      });

      descEditorRef.current = descEditor;
      document.getElementById(descEditorId.current).dir = descDirection;
    }

    return () => {
      if (titleEditorRef.current) {
        titleEditorRef.current.destroy();
      }
      if (descEditorRef.current) {
        descEditorRef.current.destroy();
      }
    };
  }, [title, desc]);

  if (
    !title ||
    !desc ||
    title.blocks.length === 0 ||
    desc.blocks.length === 0
  ) {
    return null;
  }

  return (
    <div>
      <div id={titleEditorId.current} />
      <div
        id={descEditorId.current}
        className="text-truncate"
        style={{ display: "block !important" }}
      />
    </div>
  );
};

Editor.propTypes = {
  title: PropTypes.object.isRequired,
  desc: PropTypes.object.isRequired,
};

export default Editor;
