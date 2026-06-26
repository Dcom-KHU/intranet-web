import { type InfoPostList, type InfoPostDetail } from "../features/info-sharing/types/info-sharing.type";

// 정보 공유 게시판 전체 목록
export const infoPostList: InfoPostList[] = [
  {
    id: 1,
    title: "시간 복잡도 Big-O 핵심 정리 (면접 필수)",
    author: {
      studentNumber: "20201234",
      name: "표지훈",
    },
    date: "2026.06.20.",
    hasAttachment: true,
  },
  {
    id: 2,
    title: "TCP 3-way handshake 동작 원리 정리",
    author: {
      studentNumber: "20201111",
      name: "허남준",
    },
    date: "2026.06.21.",
    hasAttachment: true,
  },
  {
    id: 3,
    title: "운영체제: 프로세스 vs 스레드 완벽 비교",
    author: {
      studentNumber: "20201333",
      name: "안유진",
    },
    date: "2026.06.22.",
    hasAttachment: false,
  },
  {
    id: 4,
    title: "DB 인덱스(B-Tree) 구조 이해하기",
    author: {
      studentNumber: "20201444",
      name: "김선호",
    },
    date: "2026.06.23.",
    hasAttachment: false,
  },
  {
    id: 5,
    title: "동기/비동기 & Blocking/Non-blocking 차이",
    author: {
      studentNumber: "20201555",
      name: "지창욱",
    },
    date: "2026.06.24.",
    hasAttachment: true,
  },
];


export const infoPostDetail: InfoPostDetail[] = [
  {
    id: 1,
    title: "시간 복잡도 Big-O 핵심 정리 (면접 필수)",
    description: `
시간 복잡도는 알고리즘 성능을 평가하는 가장 기본적인 기준이다.

- O(1): 해시 접근, 배열 인덱스 접근
- O(log N): 이진 탐색
- O(N): 순차 탐색
- O(N log N): Merge Sort, Quick Sort
- O(N^2): Bubble Sort

면접 핵심:
이진 탐색이 왜 O(log N)인지 설명할 수 있어야 한다.
=> 매 단계마다 탐색 범위가 절반으로 줄어든다.
    `,
    author: {
      studentNumber: "20201234",
      name: "표지훈",
    },
    date: "2026.06.20.",
    attachments: [
      "big-o-summary.pdf",
      "algorithm-cheatsheet.png",
    ],
  },
  {
    id: 2,
    title: "TCP 3-way handshake 동작 원리 정리",
    description: `
TCP는 신뢰성 있는 연결을 제공하는 프로토콜이다.

[3-way handshake]
1. SYN (Client → Server)
2. SYN-ACK (Server → Client)
3. ACK (Client → Server)

연결 종료:
FIN / ACK 교환 후 TIME_WAIT 상태 유지
    `,
    author: {
      studentNumber: "20201111",
      name: "허남준",
    },
    date: "2026.06.21.",
    attachments: [],
  },
  {
    id: 3,
    title: "운영체제: 프로세스 vs 스레드 완벽 비교",
    description: `
프로세스:
- 독립된 메모리 공간
- IPC 필요

스레드:
- 같은 프로세스 내 실행 단위
- Heap 공유, Stack 독립

핵심:
자원 공유 여부와 컨텍스트 스위칭 비용이 차이점이다.
    `,
    author: {
      studentNumber: "20201333",
      name: "안유진",
    },
    date: "2026.06.22.",
    attachments: [
      "process-thread-diagram.png",
    ],
  },
  {
    id: 4,
    title: "DB 인덱스(B-Tree) 구조 이해하기",
    description: `
B-Tree 인덱스는 균형 트리 구조로 데이터 검색을 최적화한다.

특징:
- 모든 leaf node depth 동일
- range query에 강함
- insert/delete 시 rebalancing 발생

주의:
인덱스를 무조건 많이 만든다고 성능이 좋아지지 않는다.
    `,
    author: {
      studentNumber: "20201444",
      name: "김선호",
    },
    date: "2026.06.23.",
    attachments: [],
  },
  {
    id: 5,
    title: "동기/비동기 & Blocking/Non-blocking 차이",
    description: `
이 개념은 서로 다른 축이다.

동기/비동기:
- 결과를 기다리는 방식

Blocking/Non-blocking:
- 제어권 반환 여부

조합:
- Sync + Blocking: 일반 함수 호출
- Async + Non-blocking: 이벤트 루프 기반 처리 (Node.js)

핵심:
두 개념을 혼동하면 안 된다.
    `,
    author: {
      studentNumber: "20201555",
      name: "지창욱",
    },
    date: "2026.06.24.",
    attachments: [],
  },
];