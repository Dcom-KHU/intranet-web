import { useRef } from "react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IoClose } from "react-icons/io5";

import {
  examTypeOptions,
  semesterOptions,
  uploadModeConfig,
} from "../constants/uploadConfig";
import type {
  UploadEntry,
  UploadMode,
  UploadPostDraft,
} from "../types/upload.type";
import Field from "./fields/Field";
import SelectField from "./fields/SelectField";
import UploadToolbar from "./UploadToolbar";

type UploadEntryCardProps = {
  entry: UploadEntry;
  mode: UploadMode;
  index: number;
  isOnlyEntry: boolean;
  onChange: (patch: Partial<UploadPostDraft>) => void;
  onRemove: () => void;
};

export default function UploadEntryCard({
  entry,
  mode,
  index,
  isOnlyEntry,
  onChange,
  onRemove,
}: UploadEntryCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = uploadModeConfig[mode];
  const placeholder = config.showExamFields
    ? "자료 설명을 입력하세요"
    : "내용을 입력하세요";
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({ placeholder }),
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
    onChange({ files: entry.files.filter((file) => file !== fileToRemove) });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeExistingFile = (fileToRemove: string) => {
    onChange({
      existingFiles: entry.existingFiles.filter(
        (file) => file !== fileToRemove,
      ),
    });
  };

  const removeExistingFileItem = (fileId: number) => {
    onChange({
      existingFileItems: entry.existingFileItems.filter(
        (file) => file.id !== fileId,
      ),
      deleteFileIds: entry.deleteFileIds.includes(fileId)
        ? entry.deleteFileIds
        : [...entry.deleteFileIds, fileId],
    });
  };

  const appendFiles = (selectedFiles: File[]) => {
    const existingFileKeys = new Set(
      entry.files.map(
        (file) =>
          `${file.name}-${file.size}-${file.lastModified}-${file.type}`,
      ),
    );
    const filesToAdd = selectedFiles.filter((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;

      if (existingFileKeys.has(key)) return false;
      existingFileKeys.add(key);
      return true;
    });

    onChange({ files: [...entry.files, ...filesToAdd] });
  };

  return (
    <div className="relative min-h-[420px] rounded-xl border border-gray-200 bg-white px-6 pb-6 pt-7 shadow-sm sm:px-8">
      <button
        type="button"
        aria-label={isOnlyEntry ? "닫기" : "작성 항목 삭제"}
        className="absolute right-5 top-5 text-gray-300 transition-colors hover:text-gray-500"
        onClick={onRemove}
      >
        <IoClose size={16} />
      </button>

      {config.showExamFields ? (
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
      ) : config.showGalleryFields ? (
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
      ) : (
        <Field
          label="제목"
          name={`posts.${index}.title`}
          placeholder="제목"
          value={entry.title}
          onChange={(value) => onChange({ title: value })}
        />
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

      {entry.existingFiles.length > 0 && (
        <ul className="mb-4 space-y-2">
          {entry.existingFiles.map((file) => (
            <li key={file} className="flex w-fit items-center gap-1 text-xs">
              <span className="text-[#4988C4] underline underline-offset-2">
                {file.split("/").pop() ?? file}
              </span>
              <button
                type="button"
                aria-label={`${file} 삭제`}
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
                onClick={() => removeExistingFile(file)}
              >
                <IoClose size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {entry.existingFileItems.length > 0 && (
        <ul className="mb-4 space-y-2">
          {entry.existingFileItems.map((file) => (
            <li key={file.id} className="flex w-fit items-center gap-1 text-xs">
              <span className="text-[#4988C4] underline underline-offset-2">
                {file.name}
              </span>
              <button
                type="button"
                aria-label={`${file.name} 삭제`}
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
                onClick={() => removeExistingFileItem(file.id)}
              >
                <IoClose size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {config.requireImage &&
        entry.files.length === 0 &&
        entry.existingFiles.length === 0 &&
        entry.existingFileItems.length === 0 && (
          <p className="mb-4 text-xs text-red-400">
            사진을 최소 1개 이상 첨부해주세요.
          </p>
        )}

      <UploadToolbar
        editor={editor}
        attachmentLabel={config.showExamFields ? "파일 첨부" : "사진 첨부"}
        onAttach={() => fileInputRef.current?.click()}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={config.showExamFields ? undefined : "image/*"}
        className="hidden"
        onChange={(event) => {
          appendFiles(Array.from(event.target.files ?? []));
          event.currentTarget.value = "";
        }}
      />
    </div>
  );
}
