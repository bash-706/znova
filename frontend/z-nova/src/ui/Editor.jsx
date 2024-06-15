import { EditorContent, useEditor } from '@tiptap/react';
import 'highlight.js/styles/atom-one-dark.css';
import MenuBar from './MenuBar';
import { extensions } from '../utils/tiptapExtensions';

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        style: 'width: 100%; min-height: 22rem; border: none; outline: none;',
      },
      style: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '65ch',
        marginTop: '1.75rem',
        fontSize: '1rem',
        lineHeight: '1.625',
        '@media (prefers-color-scheme: dark)': {
          color: 'red',
        },
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content,
  });

  return (
    <div
      style={{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {editable && <MenuBar editor={editor} />}
      <EditorContent
        editor={editor}
        style={
          editable
            ? {
                border: '1px solid var(--color-grey-300)',
                borderRadius: 'var(--border-radius-sm)',
                padding: '0.8rem 1.2rem',
              }
            : {}
        }
      />
    </div>
  );
};

export default Editor;
