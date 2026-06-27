import type { ReactNode } from "react";
import type { Editor } from "@tiptap/react";
import { IoAttach } from "react-icons/io5";

type UploadToolbarProps = {
  editor: Editor | null;
  attachmentLabel: string;
  onAttach: () => void;
};

export default function UploadToolbar({
  editor,
  attachmentLabel,
  onAttach,
}: UploadToolbarProps) {
  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 URL", previousUrl ?? "");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#F4F7FB] px-2 py-1 text-[11px] text-gray-500 sm:w-fit">
      <ToolbarButton
        label="되돌리기"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().undo()}
      >
        Undo
      </ToolbarButton>
      <ToolbarButton
        label="다시 실행"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().redo()}
      >
        Redo
      </ToolbarButton>
      
      <ToolbarButton
        label="굵게"
        isActive={editor?.isActive("bold")}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        label="기울임"
        isActive={editor?.isActive("italic")}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        I
      </ToolbarButton>
      <ToolbarButton
        label="밑줄"
        isActive={editor?.isActive("underline")}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        U
      </ToolbarButton>
      <ToolbarButton
        label="취소선"
        isActive={editor?.isActive("strike")}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        S
      </ToolbarButton>
      <ToolbarButton
        label="글머리 기호"
        isActive={editor?.isActive("bulletList")}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        List
      </ToolbarButton>
      <ToolbarButton
        label="번호 목록"
        isActive={editor?.isActive("orderedList")}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        1.
      </ToolbarButton>
      <ToolbarButton
        label="링크"
        isActive={editor?.isActive("link")}
        onClick={setLink}
      >
        Link
      </ToolbarButton>
      <button
        type="button"
        aria-label={attachmentLabel}
        className="rounded-full px-2 py-1 hover:bg-white"
        onClick={onAttach}
      >
        <IoAttach />
      </button>
    </div>
  );
}

function ToolbarButton({
  children,
  label,
  isActive = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={`min-w-6 rounded-full px-1 py-1 font-medium transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 ${
        isActive ? "bg-white text-[#4988C4] shadow-sm" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
