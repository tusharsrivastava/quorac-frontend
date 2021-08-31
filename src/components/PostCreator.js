import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useTranslation } from "react-i18next";
import { useEffect, useCallback } from "react";
import { useField } from "formik";

const _PostCreator = (props) => {
  const { t } = useTranslation();
  const { isHtml } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;

  const editorRef = useRef(null);

  const [content, setContent] = useState(value);

  const handleEditorChange = useCallback((value) => {
    setContent(value);
    setValue(value);
  }, [setValue]);

  useEffect(() => {
    if (!isHtml) {
      if (editorRef.current) {
        editorRef.current.component.currentPlace.container.remove();
      }
    }
  }, [isHtml]);

  return isHtml ? (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={{
        readonly: false,
        uploader: {
          insertImageAsBase64URI: true,
        },
      }}
      onBlur={handleEditorChange}
    />
  ) : (
    <></>
  );
};

export const PostCreator = _PostCreator;
