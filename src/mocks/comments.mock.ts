import { type Comment } from "../features/comment/types/comment.type";

export const Comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: {
      studentNumber: "2022100001",
      name: "김우빈",
    },
    content: "커리어 세션 내용이 정말 유익했어요!",
    createdAt: "2026.05.16",
  },
  {
    id: 2,
    postId: 1,
    author: {
      studentNumber: "2022100002",
      name: "박보검",
    },
    content: "다음에도 이런 행사 기대됩니다.",
    createdAt: "2026.05.16",
  },
  {
    id: 3,
    postId: 2,
    author: {
      studentNumber: "2022100003",
      name: "차은우",
    },
    content: "발표 준비 너무 잘하셨어요.",
    createdAt: "2026.05.10",
  },
  {
    id: 4,
    postId: 2,
    author: {
      studentNumber: "2022100004",
      name: "정해인",
    },
    content: "질문 시간도 알찼습니다.",
    createdAt: "2026.05.10",
  },
  {
    id: 5,
    postId: 3,
    author: {
      studentNumber: "2022100005",
      name: "김연아",
    },
    content: "분위기가 너무 좋았어요.",
    createdAt: "2026.04.27",
  },
  {
    id: 6,
    postId: 3,
    author: {
      studentNumber: "2022100006",
      name: "한지민",
    },
    content: "사진도 예쁘게 나왔네요!",
    createdAt: "2026.04.27",
  },
  {
    id: 7,
    postId: 4,
    author: {
      studentNumber: "2022100007",
      name: "손예진",
    },
    content: "네트워킹 행사 유익했습니다.",
    createdAt: "2026.03.18",
  },
  {
    id: 8,
    postId: 4,
    author: {
      studentNumber: "2022100008",
      name: "강하늘",
    },
    content: "좋은 사람들을 많이 만났어요.",
    createdAt: "2026.03.18",
  },
  {
    id: 9,
    postId: 5,
    author: {
      studentNumber: "2022100009",
      name: "아이유",
    },
    content: "세션 구성 정말 좋았습니다.",
    createdAt: "2026.02.11",
  },
  {
    id: 10,
    postId: 5,
    author: {
      studentNumber: "2022100010",
      name: "수지",
    },
    content: "다음에는 더 길게 진행했으면 좋겠어요.",
    createdAt: "2026.02.11",
  },
  {
    id: 11,
    postId: 5,
    author: {
      studentNumber: "2022100011",
      name: "이도현",
    },
    content: "정말 도움이 되는 시간이었습니다.",
    createdAt: "2026.01.20",
  },
  {
    id: 12,
    postId: 8,
    author: {
      studentNumber: "2022100012",
      name: "박서준",
    },
    content: "준비하신 분들 고생 많으셨어요.",
    createdAt: "2026.01.20",
  },
  {
    id: 13,
    postId: 1,
    author: {
      studentNumber: "2022100013",
      name: "이민호",
    },
    content: "처음 참여했는데 너무 좋았어요.",
    createdAt: "2026.05.17",
  },
  {
    id: 14,
    postId: 2,
    author: {
      studentNumber: "2022100014",
      name: "한소희",
    },
    content: "다음에도 꼭 참여하고 싶어요.",
    createdAt: "2026.05.11",
  },
  {
    id: 15,
    postId: 3,
    author: {
      studentNumber: "2022100015",
      name: "박보영",
    },
    content: "전체적으로 매우 만족스러운 행사였습니다.",
    createdAt: "2026.04.28",
  },
];