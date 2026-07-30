import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { Editor } from "@tiptap/react";
import { IoAttach, IoClose, IoLinkOutline } from "react-icons/io5";

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
  const [isLinkEditorOpen, setIsLinkEditorOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLinkEditorOpen) return;

    const frame = window.requestAnimationFrame(() => {
      linkInputRef.current?.focus();
      linkInputRef.current?.select();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isLinkEditorOpen]);

  const openLinkEditor = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    setLinkUrl(previousUrl ?? "");
    setIsLinkEditorOpen(true);
  };

  const applyLink = () => {
    if (!editor) return;

    const trimmedUrl = linkUrl.trim();
    if (!trimmedUrl) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsLinkEditorOpen(false);
      return;
    }

    const normalizedUrl = /^(https?:\/\/|mailto:|tel:)/i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalizedUrl })
      .run();
    setIsLinkEditorOpen(false);
  };

  const removeLink = () => {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkUrl("");
    setIsLinkEditorOpen(false);
  };

  const handleLinkInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyLink();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsLinkEditorOpen(false);
      editor?.commands.focus();
    }
  };

  return (
    <div className="relative flex flex-wrap items-center gap-1 rounded-full bg-[#F4F7FB] px-2 py-1 text-[11px] text-gray-500 sm:w-fit">
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
        <span className="line-through">S</span>
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
        onClick={openLinkEditor}
      >
        Link
      </ToolbarButton>

      {isLinkEditorOpen && (
        <div
          className="absolute bottom-full left-0 z-20 mb-2 w-[min(18rem,calc(100vw-3rem))] rounded-2xl border border-gray-200 bg-white p-3 text-left shadow-xl"
          role="dialog"
          aria-label="하이퍼링크 추가"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#0F2854]">
              <IoLinkOutline size={14} />
              하이퍼링크
            </span>
            <button
              type="button"
              aria-label="링크 입력 닫기"
              className="rounded-full p-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
              onClick={() => setIsLinkEditorOpen(false)}
            >
              <IoClose size={14} />
            </button>
          </div>

          <input
            ref={linkInputRef}
            type="url"
            inputMode="url"
            value={linkUrl}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-[#4988C4] focus:ring-2 focus:ring-[#4988C4]/10"
            onChange={(event) => setLinkUrl(event.target.value)}
            onKeyDown={handleLinkInputKeyDown}
          />

          <div className="mt-3 flex items-center justify-end gap-2">
            {editor?.isActive("link") && (
              <button
                type="button"
                className="rounded-lg px-3 py-1.5 text-xs text-red-400 transition-all hover:bg-red-50"
                onClick={removeLink}
              >
                링크 제거
              </button>
            )}
            <button
              type="button"
              className="rounded-lg bg-[#4988C4] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-[#3D79B2]"
              onClick={applyLink}
            >
              적용
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={attachmentLabel}
        className="rounded-full px-2 py-1 transition-all hover:bg-white"
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
      className={`min-w-6 rounded-full px-1 py-1 font-medium transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 ${
        isActive ? "bg-white text-[#4988C4] shadow-sm" : ""
      }`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
