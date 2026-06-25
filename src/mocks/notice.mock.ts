import type {
  NoticeType,
  NoticeDetailType,
} from "../features/notice/types/notice.type";

const ADMIN = "관리자";

export const notice_mock: NoticeType[] = [
  {
    id: 1,
    title: "2026 D.COM 여름 프로젝트 팀 모집 안내",
    author: ADMIN,
    date: "2026.06.20",
    hasAttachment: true,
  },
  {
    id: 2,
    title: "정기 세미나 발표자 신청 안내",
    author: ADMIN,
    date: "2026.06.14",
    hasAttachment: false,
  },
  {
    id: 3,
    title: "동아리방 이용 수칙 변경 안내",
    author: ADMIN,
    date: "2026.06.05",
    hasAttachment: false,
  },
  {
    id: 4,
    title: "신입 부원 Git 기초 워크숍 일정",
    author: ADMIN,
    date: "2026.05.29",
    hasAttachment: true,
  },
  {
    id: 5,
    title: "기말고사 기간 활동 일정 조정 안내",
    author: ADMIN,
    date: "2026.05.18",
    hasAttachment: true,
  },
  {
    id: 6,
    title: "홈페이지 개선 의견 수렴",
    author: ADMIN,
    date: "2026.05.03",
    hasAttachment: false,
  },
];

export const notice_detail_mock: NoticeDetailType[] = [
  {
    id: 1,
    title: "2026 D.COM 여름 프로젝트 팀 모집 안내",
    description: `
안녕하세요.

2026년 여름 프로젝트 팀원을 모집합니다.

모집 분야
- 프론트엔드
- 백엔드
- AI/데이터
- 디자인

신청 기간: 2026.06.20 ~ 2026.06.30

많은 관심과 참여 부탁드립니다.
    `,
    author: ADMIN,
    date: "2026.06.20",
    files: ["2026-summer-project-guide.pdf"],
  },
  {
    id: 2,
    title: "정기 세미나 발표자 신청 안내",
    description: `
다음 정기 세미나 발표자를 모집합니다.

관심 있는 기술 주제를 자유롭게 선정하여 발표할 수 있습니다.

발표 신청 마감: 2026.06.21
발표 일시: 2026.06.28
    `,
    author: ADMIN,
    date: "2026.06.14",
  },
  {
    id: 3,
    title: "동아리방 이용 수칙 변경 안내",
    description: `
동아리방 이용 수칙이 일부 변경되었습니다.

주요 변경 사항
- 퇴실 전 정리 정돈 필수
- 음식물 반입 후 즉시 정리
- 공용 장비 사용 후 원위치

변경된 수칙을 확인해 주세요.
    `,
    author: ADMIN,
    date: "2026.06.05",
    files: ["clubroom-rules.pdf"],
  },
  {
    id: 4,
    title: "신입 부원 Git 기초 워크숍 일정",
    description: `
신입 부원을 대상으로 Git 기초 워크숍을 진행합니다.

일시: 2026.06.07 14:00
장소: 공학관 301호

노트북을 지참해 주세요.
    `,
    author: ADMIN,
    date: "2026.05.29",
  },
  {
    id: 5,
    title: "기말고사 기간 활동 일정 조정 안내",
    description: `
기말고사 기간 동안 정기 활동 일정이 일부 조정됩니다.

조정 기간: 2026.06.10 ~ 2026.06.24

자세한 일정은 추후 공지 예정입니다.
    `,
    author: ADMIN,
    date: "2026.05.18",
  },
  {
    id: 6,
    title: "홈페이지 개선 의견 수렴",
    description: `
동아리 홈페이지 개선을 위한 의견을 받고 있습니다.

불편했던 점이나 추가되었으면 하는 기능을 자유롭게 제안해 주세요.

제출 기한: 2026.05.15
    `,
    author: ADMIN,
    date: "2026.05.03",
    files: ["homepage-feedback-form.docx"],
  },
];