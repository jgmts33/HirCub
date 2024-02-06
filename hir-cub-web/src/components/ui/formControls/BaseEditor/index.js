import React from 'react';

import { Editor } from '@tinymce/tinymce-react';

const BaseEditor = ({ editorRef, onEditorChange, setLoaded }) => {
  return (
    <Editor
      apiKey="8gkgnkg9l2s5r4o47i02pqtr8q01p3w0z9dfg4n52z6fgdnp"
      onInit={(_, editor) => {
        setLoaded(true);
        editorRef.current = editor;
      }}
      init={{
        height: 300,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar: 'undo redo | formatselect | ' +
          'bold italic forecolor backcolor | alignleft aligncenter ' +
          'alignright | bullist numlist outdent indent | ' +
          'removeformat | help',
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default BaseEditor;
