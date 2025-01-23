import React from 'react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'

const MenuBar = ({ editor }) => {
 if (!editor) return null;
 
 const handleButtonClick = (callback) => (e) => {
   e.preventDefault();
   e.stopPropagation();
   callback();
 };

 return (
   <div className="flex flex-wrap gap-2 p-2 border-b bg-slate-50">
     <select
       onChange={(e) => {
         e.preventDefault();
         const tag = e.target.value;
         if (tag.startsWith('h')) {
           editor.chain().focus().toggleHeading({ level: parseInt(tag[1]) }).run();
         } else {
           editor.chain().focus().setParagraph().run();
         }
       }}
       className="p-1 rounded border"
     >
       <option value="p">Normal</option>
       <option value="h1">Heading 1</option>
       <option value="h2">Heading 2</option>
       <option value="h3">Heading 3</option>
     </select>
  
     <input
       type="color"
       onChange={(e) => {
         e.preventDefault();
         editor.chain().focus().setColor(e.target.value).run();
       }}
       className="w-8 h-8 p-0 border rounded cursor-pointer"
     />

     <button
       onClick={handleButtonClick(() => editor.chain().focus().toggleBold().run())}
       className={`p-2 rounded ${editor.isActive('bold') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
     >
       <strong>B</strong>
     </button>

     <button
       onClick={handleButtonClick(() => editor.chain().focus().toggleItalic().run())}
       className={`p-2 rounded ${editor.isActive('italic') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
     >
       <i>I</i>
     </button>

     <button
       onClick={handleButtonClick(() => editor.chain().focus().toggleUnderline().run())}
       className={`p-2 rounded ${editor.isActive('underline') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
     >
       <u>U</u>
     </button>

     <button
       onClick={handleButtonClick(() => editor.chain().focus().toggleBulletList().run())}
       className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
     >
       •
     </button>

     <button
       onClick={handleButtonClick(() => editor.chain().focus().toggleOrderedList().run())}
       className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-slate-200' : 'hover:bg-slate-100'}`}
     >
       1.
     </button>
   </div>
 );
};

const RichTextEditor = ({ value, onChange, placeholder }) => {
 const editor = useEditor({
   extensions: [
     StarterKit.configure({
       bulletList: {
         HTMLAttributes: {
           class: 'list-disc pl-4 mb-4'
         }
       },
       orderedList: {
         HTMLAttributes: {
           class: 'list-decimal pl-4 mb-4'
         }
       },
       paragraph: {
         HTMLAttributes: {
           class: 'mb-4'
         }
       }
     }),
     Color,
     TextStyle,
     Underline
   ],
   content: value,
   onUpdate: ({ editor }) => {
     const html = editor.getHTML();
     onChange(html);
   },
   editorProps: {
     attributes: {
       class: 'prose max-w-none focus:outline-none min-h-[7rem] p-2',
     },
   },
 });

 return (
   <div className="border rounded bg-slate-100" onClick={e => e.stopPropagation()}>
     <MenuBar editor={editor} />
     <EditorContent editor={editor} placeholder={placeholder} />
   </div>
 );
};

export default RichTextEditor;