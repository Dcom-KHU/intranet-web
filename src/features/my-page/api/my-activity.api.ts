import { getCommentsByAuthor } from "../../comment/api/comment.api";
import { getExam, getExamArchives } from "../../exam-archive/api/exam-archive.api";
import { getGalleryPosts } from "../../gallery/api/gallery.api";
import { getInfos } from "../../info-sharing/api/info-sharing.api";
import { getNotices } from "../../notice/api/notice.api";
import type { MyCommentItem, MyPostItem } from "../types/types";
import { toExamArchive } from "../../exam-archive/mapper/exam-archives.mapper";

const byNewestDate = <T extends { date: string }>(left: T, right: T) =>
  right.date.localeCompare(left.date);

export const getMyPosts = async (
  studentNumber: string,
  includeAdminContent: boolean,
): Promise<MyPostItem[]> => {
  const [notices, infos, exams, archives, galleryPosts] = await Promise.all([
    getNotices(),
    getInfos(),
    getExam(),
    getExamArchives(),
    getGalleryPosts(),
  ]);

  const noticeItems: MyPostItem[] = notices
    .filter((post) => post.author.studentNumber === studentNumber)
    .map((post) => ({
      key: `notice-${post.id}`,
      board: "notice",
      boardLabel: "공지사항",
      title: post.title,
      date: post.date,
      href: `/notice/${post.id}`,
    }));

  const infoItems: MyPostItem[] = infos
    .filter((post) => post.author.studentNumber === studentNumber)
    .map((post) => ({
      key: `info-sharing-${post.id}`,
      board: "info-sharing",
      boardLabel: "정보 공유",
      title: post.title,
      date: post.date,
      href: `/info/${post.id}`,
    }));

  const examItems: MyPostItem[] = exams
    .filter((post) => post.author.studentNumber === studentNumber)
    .flatMap((post): MyPostItem[] => {
      const archive = archives.content.map(toExamArchive).find(
        (item) =>
          item.subject === post.subject && item.professor === post.professor,
      );

      if (!archive) return [];

      return [
        {
          key: `exam-archive-${post.id}`,
          board: "exam-archive",
          boardLabel: "족보",
          title: `${post.subject} · ${post.semester} (${post.professor})`,
          date: post.date,
          href: `/exam-archive/${archive.id}`,
        },
      ];
    });

  const galleryItems: MyPostItem[] = includeAdminContent
    ? galleryPosts.map((post) => ({
        key: `gallery-${post.id}`,
        board: "gallery",
        boardLabel: "활동사진",
        title: post.title,
        date: post.date,
        href: `/gallery/${post.id}`,
      }))
    : [];

  return [...noticeItems, ...infoItems, ...examItems, ...galleryItems].sort(
    byNewestDate,
  );
};

export const getMyComments = async (
  studentNumber: string,
): Promise<MyCommentItem[]> => {
  const [comments, infos, galleryPosts] = await Promise.all([
    getCommentsByAuthor(studentNumber),
    getInfos(),
    getGalleryPosts(),
  ]);

  return comments
    .flatMap((comment): MyCommentItem[] => {
      const isGallery = comment.target === "gallery";
      const post = isGallery
        ? galleryPosts.find((item) => item.id === comment.postId)
        : infos.find((item) => item.id === comment.postId);

      if (!post) return [];

      return [
        {
          key: `${comment.target}-${comment.id}`,
          board: comment.target,
          boardLabel: isGallery ? "활동 사진" : "정보공유",
          postTitle: post.title,
          content: comment.content,
          date: comment.createdAt,
          href: isGallery
            ? `/gallery/${comment.postId}`
            : `/info/${comment.postId}`,
        },
      ];
    })
    .sort(byNewestDate);
};
