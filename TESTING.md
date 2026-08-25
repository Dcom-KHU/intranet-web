# 자동화 테스트 안내

사용자에게 큰 영향을 주는 입력 검증과 서버 요청 데이터 변환을 우선 보호한다. 색상이나 간격처럼 자주 바뀌는 UI 표현은 현재 테스트 범위에서 제외했다.

## 실행 방법

- 개발 중 감시 실행: `npm test`
- 전체 1회 실행: `npm run test:run`
- 프로덕션 빌드 확인: `npm run build`

## 테스트 현황

- 테스트: **총 25개**
- 테스트 파일(`*.test.ts`): **총 9개**
- 테스트 환경 설정 파일: **1개** (`tests/setup.ts`)
- `tests/` 폴더 내부 파일: **총 10개**

테스트 파일 하나에 관련된 여러 테스트를 모아 관리한다. 따라서 테스트 25개와 테스트 파일 9개가 일치할 필요는 없다. `setup.ts`는 테스트 실행 환경을 준비하는 파일이며 테스트 자체는 포함하지 않는다.

| 기능 | 테스트 수 | 테스트 파일 | 보호하는 내용 |
| --- | ---: | --- | --- |
| 날짜 표시 | 3개 | `date/date.test.ts` | 일반 날짜, 관리자 날짜·시간, 잘못된 서버 날짜 처리 |
| 파일 업로드 검증 | 4개 | `upload/fileValidation.test.ts` | 파일당 20MB, 요청당 100MB, 활동사진 확장자, 중복 파일 |
| 업로드 필수 입력 | 6개 | `upload/uploadValidation.test.ts` | 족보 과목·교수, 제목, 본문, 활동 날짜, 활동사진, 정상 제출 |
| 회원 입력 검증 | 5개 | `auth/authValidation.test.ts` | 아이디, 비밀번호, 비밀번호 확인, 이메일, 전화번호 |
| 공지 요청 변환 | 2개 | `mappers/notice.mapper.test.ts` | HTML 본문 변환, 삭제 파일 ID 유지 |
| 족보 요청 변환 | 2개 | `mappers/exam-archives.mapper.test.ts` | 연도·학기 null, 시험 유형·본문·삭제 파일 ID 유지 |
| 활동사진 요청 변환 | 1개 | `mappers/gallery.mapper.test.ts` | 등록·수정 요청의 행사명, 날짜, 본문 변환 |
| 정보 공유 요청 변환 | 1개 | `mappers/info.mapper.test.ts` | 수정 본문과 삭제 파일 ID 유지 |
| 마이페이지 게시글 삭제 | 1개 | `my-page/myPost.test.ts` | 족보 recordId와 일반 게시글 id 선택, 잘못된 ID 차단 |
| **합계** | **25개** | **9개** | |

## 폴더 구조

```text
tests/
├─ setup.ts
└─ unit/
   ├─ auth/
   │  └─ authValidation.test.ts
   ├─ date/
   │  └─ date.test.ts
   ├─ upload/
   │  ├─ fileValidation.test.ts
   │  └─ uploadValidation.test.ts
   ├─ my-page/
   │  └─ myPost.test.ts
   └─ mappers/
      ├─ notice.mapper.test.ts
      ├─ exam-archives.mapper.test.ts
      ├─ gallery.mapper.test.ts
      └─ info.mapper.test.ts
```

## 테스트 설계 기준

- 구현 내부 상태보다 사용자가 실제로 겪는 결과와 서버 계약을 검증한다.
- 제한값의 정확한 경계와 1바이트 초과 상황을 함께 검증한다.
- 순수 로직은 컴포넌트에서 분리해 빠르고 안정적인 단위 테스트로 실행한다.
- DOM이 필요한 컴포넌트 테스트는 파일 상단에 `// @vitest-environment jsdom`을 지정한다.
- API 통합 및 브라우저 E2E 테스트는 테스트 서버와 전용 계정이 준비된 후 추가한다.
