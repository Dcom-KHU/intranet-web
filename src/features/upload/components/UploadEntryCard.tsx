import { useRef, useState, type DragEvent } from "react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IoClose } from "react-icons/io5";

import Modal from "../../../components/ui/Modal";
import {
  emptyExamPeriodOption,
  examYearOptions,
  examTypeOptions,
  MAX_FILE_SIZE_BYTES,
  MAX_UPLOAD_REQUEST_SIZE_BYTES,
  semesterOptions,
  uploadModeConfig,
} from "../constants/uploadConfig";
import type {
  UploadEntry,
  UploadMode,
  UploadPostDraft,
} from "../types/upload.type";
import Field from "./fields/Field";
import DateField from "./fields/DateField";
import SelectField from "./fields/SelectField";
import UploadToolbar from "./UploadToolbar";

const GALLERY_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "heic"];

type UploadEntryCardProps = {
  entry: UploadEntry;
  mode: UploadMode;
  index: number;
  isOnlyEntry: boolean;
  totalSelectedFileSize: number;
  onChange: (patch: Partial<UploadPostDraft>) => void;
  onRemove: () => void;
};

export default function UploadEntryCard({
  entry,
  mode,
  index,
  isOnlyEntry,
  totalSelectedFileSize,
  onChange,
  onRemove,
}: UploadEntryCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragDepthRef = useRef(0);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [fileUploadErrors, setFileUploadErrors] = useState<string[]>([]);
  const config = uploadModeConfig[mode];
  const placeholder = config.showExamFields
    ? "자료 설명을 입력하세요"
    : "내용을 입력하세요";
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        dropcursor: false,
        undoRedo: {
          newGroupDelay: 0,
        },
      }),
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class:
            "cursor-pointer text-blue-500 underline underline-offset-2",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: entry.descriptionHtml,
    editorProps: {
      attributes: {
        class:
          "upload-editor min-h-[210px] px-2 text-sm leading-6 text-gray-800 outline-none [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_a]:cursor-pointer [&_a]:text-blue-500 [&_a]:underline [&_a]:underline-offset-2 [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-gray-300 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
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
    const errors: string[] = [];
    const existingFileKeys = new Set(
      entry.files.map(
        (file) =>
          `${file.name}-${file.size}-${file.lastModified}-${file.type}`,
      ),
    );
    const uniqueFiles = selectedFiles.filter((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;

      if (existingFileKeys.has(key)) return false;
      existingFileKeys.add(key);
      return true;
    });

    const invalidFormatFiles =
      mode === "gallery"
        ? uniqueFiles.filter((file) => {
            const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
            return !GALLERY_IMAGE_EXTENSIONS.includes(extension);
          })
        : [];
    const validFormatFiles = uniqueFiles.filter(
      (file) => !invalidFormatFiles.includes(file),
    );
    const oversizedFiles = validFormatFiles.filter(
      (file) => file.size > MAX_FILE_SIZE_BYTES,
    );
    let filesToAdd = validFormatFiles.filter(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
    );

    if (invalidFormatFiles.length > 0) {
      errors.push(
        `지원하지 않는 형식: ${invalidFormatFiles.map((file) => file.name).join(", ")}`,
      );
    }
    if (oversizedFiles.length > 0) {
      errors.push(
        `파일당 20MB 초과: ${oversizedFiles.map((file) => file.name).join(", ")}`,
      );
    }

    const addedFileSize = filesToAdd.reduce((sum, file) => sum + file.size, 0);
    if (totalSelectedFileSize + addedFileSize > MAX_UPLOAD_REQUEST_SIZE_BYTES) {
      errors.push("한 번의 등록 요청에는 최대 100MB까지 첨부할 수 있습니다.");
      filesToAdd = [];
    }

    if (filesToAdd.length > 0) {
      onChange({ files: [...entry.files, ...filesToAdd] });
    }
    if (errors.length > 0) setFileUploadErrors(errors);
  };

  const isFileDrag = (event: DragEvent<HTMLDivElement>) =>
    Array.from(event.dataTransfer.types).includes("Files");

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) return;

    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current += 1;
    setIsDraggingFiles(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) return;

    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) return;

    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setIsDraggingFiles(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (!isFileDrag(event)) return;

    event.preventDefault();
    event.stopPropagation();
    dragDepthRef.current = 0;
    setIsDraggingFiles(false);

    appendFiles(Array.from(event.dataTransfer.files));
  };

  return (
    <div
      className={`relative min-h-[420px] rounded-xl border bg-white px-6 pb-6 pt-7 shadow-sm transition-colors sm:px-8 ${
        isDraggingFiles
          ? "border-dashed border-[#4988C4] bg-[#F4F8FC]"
          : "border-gray-200"
      }`}
      onDragEnterCapture={handleDragEnter}
      onDragOverCapture={handleDragOver}
      onDragLeaveCapture={handleDragLeave}
      onDropCapture={handleDrop}
    >
      {isDraggingFiles && (
        <div className="pointer-events-none absolute inset-px z-20 flex items-center justify-center rounded-[11px] bg-[#F4F8FC]">
          <p className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#4988C4]">
            파일을 여기에 놓아주세요
          </p>
        </div>
      )}

      <button
        type="button"
        aria-label={isOnlyEntry ? "닫기" : "작성 항목 삭제"}
        className="absolute right-5 top-5 text-gray-300 transition-all hover:text-gray-500"
        onClick={onRemove}
      >
        <IoClose size={16} />
      </button>

      {config.showExamFields ? (
        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-10">
          <Field
            label="과목명"
            name={`posts.${index}.subject`}
            placeholder="과목명"
            value={entry.subject}
            required
            onChange={(value) => onChange({ subject: value })}
          />
          <Field
            label="교수명"
            name={`posts.${index}.professor`}
            placeholder="OOO 교수"
            value={entry.professor}
            required
            onChange={(value) => onChange({ professor: value })}
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <SelectField
              label="연도"
              name={`posts.${index}.examYear`}
              options={examYearOptions}
              value={
                entry.examYear === null
                  ? emptyExamPeriodOption
                  : String(entry.examYear)
              }
              onChange={(value) =>
                onChange({
                  examYear:
                    value === emptyExamPeriodOption ? null : Number(value),
                })
              }
            />
            <SelectField
              label="학기"
              name={`posts.${index}.semesterCode`}
              options={semesterOptions}
              value={
                entry.semesterCode === "FIRST"
                  ? "1학기"
                  : entry.semesterCode === "SECOND"
                    ? "2학기"
                    : emptyExamPeriodOption
              }
              onChange={(value) =>
                onChange({
                  semester: value === emptyExamPeriodOption ? "" : value,
                  semesterCode:
                    value === "1학기"
                      ? "FIRST"
                      : value === "2학기"
                        ? "SECOND"
                        : null,
                })
              }
            />
          </div>
          <SelectField
            label="시험 유형"
            name={`posts.${index}.examType`}
            options={examTypeOptions}
            value={entry.examType}
            required
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
              required
              onChange={(value) => onChange({ title: value })}
            />
          </div>
          <DateField
            label="날짜"
            name={`posts.${index}.date`}
            value={entry.date}
            required
            onChange={(value) => onChange({ date: value })}
          />
          <Field
            label="장소"
            name={`posts.${index}.location`}
            placeholder="장소"
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
          required={config.requireTitle}
          onChange={(value) => onChange({ title: value })}
        />
      )}

      <p className="mt-6 px-2 text-xs font-medium text-gray-500">
        내용
        {config.requireDescription && (
          <span className="ml-0.5 text-red-500">*</span>
        )}
        {config.requireImage &&
          entry.files.length === 0 &&
          entry.existingFiles.length === 0 &&
          entry.existingFileItems.length === 0 && (
            <span className="ml-2 font-normal text-red-400">
              사진을 최소 1개 이상 첨부해주세요.
            </span>
          )}
      </p>
      <EditorContent
        editor={editor}
        aria-label={`${index + 1}번째 본문`}
        className="mt-2 min-h-[210px] w-full"
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
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-all hover:bg-gray-100 hover:text-gray-500"
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
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-all hover:bg-gray-100 hover:text-gray-500"
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
                className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-all hover:bg-gray-100 hover:text-gray-500"
                onClick={() => removeExistingFileItem(file.id)}
              >
                <IoClose size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <UploadToolbar
        editor={editor}
        attachmentLabel={mode === "gallery" ? "사진 첨부" : "파일 첨부"}
        onAttach={() => fileInputRef.current?.click()}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={
          mode === "gallery"
            ? ".jpg,.jpeg,.png,.heic,image/jpeg,image/png,image/heic"
            : undefined
        }
        className="hidden"
        onChange={(event) => {
          appendFiles(Array.from(event.target.files ?? []));
          event.currentTarget.value = "";
        }}
      />

      <Modal
        isOpen={fileUploadErrors.length > 0}
        title="첨부할 수 없는 파일이 있습니다"
        description={
          <div className="space-y-2">
            {mode === "gallery" && (
              <p>활동사진은 JPG, JPEG, PNG, HEIC 파일만 첨부할 수 있습니다.</p>
            )}
            {fileUploadErrors.map((error) => (
              <p key={error} className="break-all text-red-400">
                {error}
              </p>
            ))}
          </div>
        }
        actionLabel="확인"
        onAction={() => setFileUploadErrors([])}
        onClose={() => setFileUploadErrors([])}
        labelledById={`file-upload-error-modal-${index}`}
      />
    </div>
  );
}
