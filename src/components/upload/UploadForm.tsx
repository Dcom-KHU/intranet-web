import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IoAdd, IoAttach, IoClose } from "react-icons/io5";

import { uploadPosts } from "../../features/upload/api/upload.api";
import type {
  UploadMode,
  UploadPostDraft,
} from "../../features/upload/types/upload.type";
import { Button } from "../ui/Button";

type UploadFormProps = {
  mode: UploadMode;
  title: string;
  initialSubject?: string;
  initialProfessor?: string;
};

type UploadEntry = UploadPostDraft & {
  id: number;
};

const semesterOptions = ["2026-1", "2025-2", "2025-1", "2024-2"];
const examTypeOptions = ["중간고사", "기말고사", "퀴즈", "과제"];

const createEntry = (
  id: number,
  initialSubject = "",
  initialProfessor = "",
): UploadEntry => ({
  id,
  subject: initialSubject,
  professor: initialProfessor,
  semester: semesterOptions[0],
  examType: examTypeOptions[0],
  title: "",
  date: "",
  location: "",
  descriptionHtml: "",
  files: [],
});

export default function UploadForm({
  mode,
  title,
  initialSubject = "",
  initialProfessor = "",
}: UploadFormProps) {
  const nextIdRef = useRef(2);
  const [entries, setEntries] = useState<UploadEntry[]>([
    createEntry(1, initialSubject, initialProfessor),
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isGallery = mode === "gallery";

  const updateEntry = (id: number, patch: Partial<UploadPostDraft>) => {
    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === id ? { ...entry, ...patch } : entry,
      ),
    );
  };

  const addEntry = () => {
    const nextId = nextIdRef.current;
    nextIdRef.current += 1;

    setEntries((currentEntries) => [
      ...currentEntries,
      createEntry(nextId, initialSubject, initialProfessor),
    ]);
  };

  const removeEntry = (id: number) => {
    if (entries.length === 1) {
      window.history.back();
      return;
    }

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isGallery && entries.some((entry) => entry.files.length === 0)) {
      window.alert("활동 사진 게시글마다 사진을 최소 1개 이상 첨부해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await uploadPosts({
        mode,
        posts: entries.map(({ id: _id, ...entry }) => entry),
      });
      window.alert(`${entries.length}개의 글을 업로드했습니다.`);
    } catch (error) {
      console.error("업로드 실패:", error);
      window.alert(
        "아직 서버 API가 연결되지 않았습니다. 콘솔에서 전송 형태를 확인해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-9 text-center text-2xl font-bold text-[#4988C4]">
        {title}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <UploadEntryCard
              key={entry.id}
              entry={entry}
              mode={mode}
              index={index}
              canClose={entries.length === 1}
              onChange={(patch) => updateEntry(entry.id, patch)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          {!isGallery && (
            <button
              type="button"
              aria-label="업로드 항목 추가"
              className="mx-auto flex h-9 w-full max-w-[500px] items-center justify-center rounded-full bg-gray-200 text-[#0F2854] transition-colors hover:bg-gray-300"
              onClick={addEntry}
            >
              <IoAdd size={14} />
            </button>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth={false}
            disabled={isSubmitting}
            className={`h-9 min-w-[74px] rounded-full bg-[#4B7FF3] px-5 py-0 text-xs hover:bg-[#3767D7] disabled:cursor-not-allowed disabled:opacity-60 ${
              isGallery ? "ml-auto" : ""
            }`}
          >
            {isSubmitting ? "전송 중" : "업로드"}
          </Button>
        </div>
      </form>
    </section>
  );
}

function UploadEntryCard({
  entry,
  mode,
  index,
  canClose,
  onChange,
  onRemove,
}: {
  entry: UploadEntry;
  mode: UploadMode;
  index: number;
  canClose: boolean;
  onChange: (patch: Partial<UploadPostDraft>) => void;
  onRemove: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isExam = mode === "exam";
  const placeholder = isExam
    ? "자료 설명을 입력하세요"
    : "사진 설명을 입력하세요";
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: entry.descriptionHtml,
    editorProps: {
      attributes: {
        class:
          "min-h-[210px] text-sm leading-6 text-gray-800 outline-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-gray-300 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange({ descriptionHtml: currentEditor.getHTML() });
    },
    immediatelyRender: false,
  });

  const removeFile = (fileToRemove: File) => {
    onChange({
      files: entry.files.filter((file) => file !== fileToRemove),
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 URL", previousUrl ?? "");

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="relative min-h-[420px] rounded-xl border border-gray-200 bg-white px-6 pb-6 pt-7 shadow-sm sm:px-8">
      <button
        type="button"
        aria-label={canClose ? "닫기" : "작성 항목 삭제"}
        className="absolute right-5 top-5 text-gray-300 transition-colors hover:text-gray-500"
        onClick={onRemove}
      >
        <IoClose size={16} />
      </button>

      {isExam ? (
        <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
          <Field
            label="과목명"
            name={`posts.${index}.subject`}
            placeholder="과목명"
            value={entry.subject}
            onChange={(value) => onChange({ subject: value })}
          />
          <Field
            label="교수명"
            name={`posts.${index}.professor`}
            placeholder="OOO 교수"
            value={entry.professor}
            onChange={(value) => onChange({ professor: value })}
          />
          <SelectField
            label="학기"
            name={`posts.${index}.semester`}
            options={semesterOptions}
            value={entry.semester}
            onChange={(value) => onChange({ semester: value })}
          />
          <SelectField
            label="시험 유형"
            name={`posts.${index}.examType`}
            options={examTypeOptions}
            value={entry.examType}
            onChange={(value) => onChange({ examType: value })}
          />
        </div>
      ) : (
        <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              label="제목"
              name={`posts.${index}.title`}
              placeholder="제목"
              value={entry.title}
              onChange={(value) => onChange({ title: value })}
            />
          </div>
          <Field
            label="날짜"
            name={`posts.${index}.date`}
            placeholder="날짜"
            type="date"
            value={entry.date}
            onChange={(value) => onChange({ date: value })}
          />
          <Field
            label="위치"
            name={`posts.${index}.location`}
            placeholder="위치"
            value={entry.location}
            onChange={(value) => onChange({ location: value })}
          />
        </div>
      )}

      <EditorContent
        editor={editor}
        aria-label={`${index + 1}번째 본문`}
        className="mt-6 min-h-[210px] w-full"
      />
      <input
        type="hidden"
        name={`posts.${index}.descriptionHtml`}
        value={entry.descriptionHtml}
        readOnly
      />

      {entry.files.length > 0 && (
        <ul className="mb-4 space-y-2">
          {entry.files.map((file) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex w-fit items-center gap-1 text-xs"
            >
              <span className="text-[#4988C4] underline underline-offset-2">
                {file.name}
              </span>
              <button
                type="button"
                aria-label={`${file.name} 삭제`}
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
                onClick={() => removeFile(file)}
              >
                <IoClose size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {!isExam && entry.files.length === 0 && (
        <p className="mb-4 text-xs text-red-400">
          사진을 최소 1개 이상 첨부해주세요.
        </p>
      )}

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
        <select
          aria-label="글꼴"
          className="bg-transparent px-1 text-[11px] outline-none"
          defaultValue="Sans Serif"
        >
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Mono</option>
        </select>
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
          aria-label={isExam ? "파일 첨부" : "사진 첨부"}
          className="rounded-full px-2 py-1 hover:bg-white"
          onClick={() => fileInputRef.current?.click()}
        >
          <IoAttach />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={isExam ? undefined : "image/*"}
        className="hidden"
        onChange={(event) => {
          onChange({ files: Array.from(event.target.files ?? []) });
        }}
      />
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

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function Field({
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
}: FieldProps) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className="mt-2 w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <select
        name={name}
        value={value}
        className="mt-2 w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
