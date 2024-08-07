import {
  AiOutlineBold,
  AiOutlineClose,
  AiOutlineEnter,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUndo,
  AiOutlineUnorderedList,
} from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import { BiParagraph } from 'react-icons/bi';
import { FiCode } from 'react-icons/fi';
import { MdOutlineLayersClear } from 'react-icons/md';
import { PiCodeBlock, PiQuotes } from 'react-icons/pi';
import { TbSpacingVertical } from 'react-icons/tb';
import styled from 'styled-components';
import { useRef } from 'react';

const StyledContainer = styled.div`
  border: 1px solid #000;
  border-radius: 1rem;
  padding: 1rem;
  position: sticky;
  top: 3;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;

  & button {
    background: #fff;
    border: none;
    font-weight: bold;
  }

  .editor-btn {
    display: flex;
    justify-content: center;
    margin-right: 0.2rem;
    align-items: center;
    color: #64748b;
    border-radius: 0.5rem;
    width: 2rem;
    aspect-ratio: 1 / 1;
  }

  .active-editor-btn {
    color: #fff;
    background-color: var(--color-brand-600);
  }
`;

const MenuBar = ({ editor }) => {
  const fileInputRef = useRef(null);

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target.result;
        editor.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <StyledContainer>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`editor-btn font-black ${
          editor.isActive('heading', { level: 1 }) && 'active-editor-btn'
        }`}
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`editor-btn font-extrabold ${
          editor.isActive('heading', { level: 2 }) && 'active-editor-btn'
        }`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`editor-btn font-semibold ${
          editor.isActive('heading', { level: 3 }) && 'active-editor-btn'
        }`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`editor-btn font-medium ${
          editor.isActive('heading', { level: 4 }) && 'active-editor-btn'
        }`}
      >
        H4
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive('heading', { level: 5 }) && 'active-editor-btn'
        }`}
      >
        H5
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`editor-btn font-normal ${
          editor.isActive('heading', { level: 6 }) && 'active-editor-btn'
        }`}
      >
        H6
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn ${
          editor.isActive('bold') && 'active-editor-btn'
        }`}
      >
        <AiOutlineBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn ${
          editor.isActive('italic') && 'active-editor-btn'
        }`}
      >
        <AiOutlineItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn ${
          editor.isActive('strike') && 'active-editor-btn'
        }`}
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`editor-btn ${
          editor.isActive('code') && 'active-editor-btn'
        }`}
      >
        <FiCode />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`editor-btn`}
      >
        <MdOutlineLayersClear />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={`editor-btn`}
      >
        <AiOutlineClose />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`editor-btn ${
          editor.isActive('paragraph') && 'active-editor-btn'
        }`}
      >
        <BiParagraph />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-btn ${
          editor.isActive('bulletList') && 'active-editor-btn'
        }`}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-btn ${
          editor.isActive('orderedList') && 'active-editor-btn'
        }`}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`editor-btn ${
          editor.isActive('codeBlock') && 'active-editor-btn'
        }`}
      >
        <PiCodeBlock />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`editor-btn ${
          editor.isActive('blockquote') && 'active-editor-btn'
        }`}
      >
        <PiQuotes />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`editor-btn`}
      >
        <TbSpacingVertical />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={`editor-btn`}
      >
        <AiOutlineEnter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`editor-btn`}
      >
        <AiOutlineUndo />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`editor-btn`}
      >
        <AiOutlineRedo />
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="editor-btn"
      >
        <BsImage />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
    </StyledContainer>
  );
};

export default MenuBar;
