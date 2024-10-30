import { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import SaveButton from './SaveButton';


const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(savedContent))
      );
    }
    return EditorState.createEmpty();
  });

  const [isPreviousSpace, setIsPreviousSpace] = useState(false)

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem(
      'editorContent',
      JSON.stringify(convertToRaw(content))
    );
  };

  const handleBeforeInput = (char) => {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());
    const text = block.getText();

    if (char !== ' ') {
      setIsPreviousSpace(false)
      return 'not-handled';
    }

    if (text.length > 0 && !isPreviousSpace) {
      if (text.endsWith('#')) {
        setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
        setIsPreviousSpace(true)
        return 'handled';
      }
      else if (text === "***" || text.endsWith('***')) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
        setIsPreviousSpace(true)
        return 'handled';
      }
      else if (text === "**" || text.endsWith('**')) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'RED_TEXT'));
        setIsPreviousSpace(true)
        return 'handled';
      }
      else if (text === "*" || text.endsWith('*')) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        setIsPreviousSpace(true)
        return 'handled';
      }
    }
  };

  const styleMap = {
    'RED_TEXT': {
      color: 'red',
    },

  };

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <SaveButton onSave={handleSave} />
      <div className="border p-4 min-h-[300px]  rounded-lg bg-gray-50 shadow-sm text-black">
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={styleMap}
          placeholder="Start typing... Use # for heading, * for bold, ** for red text, and *** for underline"
        />
      </div>
    </>
  );
};

export default DraftEditor;