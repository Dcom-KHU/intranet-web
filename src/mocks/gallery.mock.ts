import { type GalleryPost, type GalleryPostDetail } from "../features/gallery/types/gallery-post.type";
import khuBg1 from "../assets/khu-bg-1.png";
import khuBg2 from "../assets/khu-bg-2.jpg";
import khuBg3 from "../assets/khu-bg-3.jpg";

export const galleryPosts: GalleryPost[] = [
  {
    id: 1,
    imageUrl: khuBg1,
    title: "2026-1 D.COM 커리어세션",
    date: "2026.05.16",
    imageCount: 5,
  },
  {
    id: 2,
    imageUrl: khuBg2,
    title: "2026-1 D.COM 정기 세미나",
    date: "2026.05.09",
    imageCount: 8,
  },
  {
    id: 3,
    imageUrl: khuBg3,
    title: "2026-1 D.COM 네트워킹 데이",
    date: "2026.04.26",
    imageCount: 6,
  },
  {
    id: 4,
    imageUrl: khuBg1,
    title: "2026-1 D.COM 프로젝트 발표회",
    date: "2026.04.12",
    imageCount: 12,
  },
  {
    id: 5,
    imageUrl: khuBg2,
    title: "2026-1 D.COM MT",
    date: "2026.03.29",
    imageCount: 10,
  },
  {
    id: 6,
    imageUrl: khuBg3,
    title: "2026-1 D.COM 신입부원 환영회",
    date: "2026.03.15",
    imageCount: 7,
  },
  {
    id: 7,
    imageUrl: khuBg1,
    title: "2025-2 D.COM 종강총회",
    date: "2025.12.20",
    imageCount: 9,
  },
  {
    id: 8,
    imageUrl: khuBg2,
    title: "2025-2 D.COM 해커톤",
    date: "2025.11.22",
    imageCount: 14,
  },
];

export const galleryPostDetails: GalleryPostDetail[] = [
  {
    id: 1,
    title: "2026-1 D.COM 커리어세션",
    description:
      "현직 개발자 선배님들을 초청하여 진로 및 취업 준비 과정에 대한 이야기를 나누는 시간을 가졌습니다. 다양한 직무 경험과 실질적인 취업 팁을 공유하며 부원들의 진로 설계에 도움을 주었습니다.",
    date: "2026.05.16",
    images: [khuBg1, khuBg2, khuBg3, khuBg1, khuBg2],
  },
  {
    id: 2,
    title: "2026-1 D.COM 정기 세미나",
    description:
      "프론트엔드와 백엔드 최신 기술 동향을 주제로 정기 세미나를 진행했습니다. 부원들이 직접 발표를 준비하고 질의응답을 통해 지식을 공유했습니다.",
    date: "2026.05.09",
    images: [khuBg2, khuBg3, khuBg1, khuBg2, khuBg3, khuBg1, khuBg2, khuBg3],
  },
  {
    id: 3,
    title: "2026-1 D.COM 네트워킹 데이",
    description:
      "기수 간 교류를 활성화하기 위해 네트워킹 프로그램을 진행했습니다. 팀별 미션과 자유로운 대화를 통해 친목을 다지는 시간을 가졌습니다.",
    date: "2026.04.26",
    images: [khuBg3, khuBg1, khuBg2, khuBg3, khuBg1, khuBg2],
  },
  {
    id: 4,
    title: "2026-1 D.COM 프로젝트 발표회",
    description:
      "한 학기 동안 진행한 프로젝트 결과물을 발표하고 피드백을 주고받는 시간을 가졌습니다. 다양한 아이디어와 기술적 시도가 돋보인 행사였습니다.",
    date: "2026.04.12",
    images: [
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
    ],
  },
  {
    id: 5,
    title: "2026-1 D.COM MT",
    description:
      "부원 간 친목을 다지기 위해 MT를 진행했습니다. 레크리에이션과 팀 활동을 통해 서로를 알아가고 즐거운 추억을 만들었습니다.",
    date: "2026.03.29",
    images: [
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
    ],
  },
  {
    id: 6,
    title: "2026-1 D.COM 신입부원 환영회",
    description:
      "새롭게 합류한 신입부원들을 환영하는 자리를 마련했습니다. 동아리 소개와 함께 선후배 간 교류의 시간을 가졌습니다.",
    date: "2026.03.15",
    images: [khuBg3, khuBg1, khuBg2, khuBg3, khuBg1, khuBg2, khuBg3],
  },
  {
    id: 7,
    title: "2025-2 D.COM 종강총회",
    description:
      "한 학기를 마무리하며 활동을 돌아보고 우수 활동 부원을 시상하는 종강총회를 진행했습니다.",
    date: "2025.12.20",
    images: [khuBg1, khuBg2, khuBg3, khuBg1, khuBg2, khuBg3, khuBg1, khuBg2, khuBg3],
  },
  {
    id: 8,
    title: "2025-2 D.COM 해커톤",
    description:
      "24시간 동안 팀별로 서비스를 기획하고 개발하는 해커톤을 개최했습니다. 창의적인 아이디어와 협업 능력을 발휘할 수 있는 뜻깊은 행사였습니다.",
    date: "2025.11.22",
    images: [
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
      khuBg1,
      khuBg2,
      khuBg3,
    ],
  },
]; 