import { useRef, useState, type FormEvent } from "react";
import { IoAdd } from "react-icons/io5";

import { Button } from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { uploadPosts } from "../api/upload.api";
import { uploadModeConfig } from "../constants/uploadConfig";
import type {
  UploadEntry,
  UploadFormProps,
  UploadPostDraft,
} from "../types/upload.type";
import {
  createUploadEntry,
  getEntriesSignature,
} from "../utils/uploadEntry";
import UploadEntryCard from "./UploadEntryCard";
import PageBackButton from "../../../components/ui/PageBackButton";


export default function UploadForm({
  mode,
  title,
  initialSubject = "",
  initialProfessor = "",
  initialPost,
  submitLabel = "업로드",
  onSubmit,
  onCancel,
  cancelLabel,
}: UploadFormProps) {
  const nextIdRef = useRef(2);
  const [initialEntries] = useState<UploadEntry[]>(() => [
    createUploadEntry(1, initialSubject, initialProfessor, initialPost),
  ]);
  const [entries, setEntries] = useState<UploadEntry[]>(() => initialEntries);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const config = uploadModeConfig[mode];
  const canAddMultiplePosts = config.allowMultiplePosts && !onSubmit;
  const isEditMode = Boolean(onSubmit);
  const isDirty =
    getEntriesSignature(entries) !== getEntriesSignature(initialEntries);

  const requestCancel = () => {
    if (onCancel && isDirty) {
      setIsCancelModalOpen(true);
      return;
    }

    if (onCancel) {
      onCancel();
      return;
    }

    window.history.back();
  };

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
      createUploadEntry(nextId, initialSubject, initialProfessor),
    ]);
  };

  const removeEntry = (id: number) => {
    if (entries.length === 1) {
      requestCancel();
      return;
    }

    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
  };

  const validateEntries = () => {
    if (
      config.requireTitle &&
      entries.some((entry) => !entry.title.trim())
    ) {
      window.alert("제목을 입력해주세요.");
      return false;
    }

    if (
      config.requireDescription &&
      entries.some((entry) => {
        const text = entry.descriptionHtml
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, "")
          .trim();

        return !text;
      })
    ) {
      window.alert("설명을 입력해주세요.");
      return false;
    }

    if (
      config.requireImage &&
      entries.some(
        (entry) =>
          entry.files.length === 0 && entry.existingFiles.length === 0,
      )
    ) {
      window.alert("사진을 최소 1개 이상 첨부해주세요.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEntries()) return;

    setIsSubmitting(true);

    try {
      const posts = entries.map((entry) => {
        const { id, ...post } = entry;
        void id;
        return post;
      });

      if (onSubmit) {
        await onSubmit(posts[0]);
      } else {
        await uploadPosts({ mode, posts });
      }

      window.alert(
        onSubmit
          ? "게시글을 수정했습니다."
          : `${entries.length}개의 글을 업로드했습니다.`,
      );
    } catch (error) {
      console.error("업로드 실패:", error);
      window.alert(
        onSubmit
          ? "게시글 수정에 실패했습니다."
          : "아직 서버 API가 연결되지 않았습니다. 콘솔에서 전송 형태를 확인해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
      {onCancel && (
        <PageBackButton
          label={cancelLabel}
          onClick={requestCancel}
        />
      )}

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
              isOnlyEntry={entries.length === 1}
              onChange={(patch) => updateEntry(entry.id, patch)}
              onRemove={() => removeEntry(entry.id)}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4">
          {canAddMultiplePosts && (
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
              !canAddMultiplePosts ? "ml-auto" : ""
            }`}
          >
            {isSubmitting ? "전송 중" : submitLabel}
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isCancelModalOpen}
        badge={isEditMode ? "수정 취소" : "작성 취소"}
        title="변경사항이 저장되지 않았습니다."
        description={
          isEditMode ? "수정을 취소하시겠습니까?" : "작성을 취소하시겠습니까?"
        }
        actionLabel="예"
        onAction={() => {
          setIsCancelModalOpen(false);
          onCancel?.();
        }}
        secondaryActionLabel="아니오"
        onSecondaryAction={() => setIsCancelModalOpen(false)}
        labelledById="edit-cancel-modal-title"
      />
    </section>
  );
}
