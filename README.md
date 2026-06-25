# D.COM Intranet Web

D.COM 인트라넷 리뉴얼 프로젝트의 React 프론트엔드 레포지토리입니다.

## Project Overview

기존 PHP, jQuery 기반 D.COM 인트라넷을 React 기반으로 리뉴얼하여, 동아리 운영에 필요한 계정 관리, 족보 아카이브, 정보 공유 게시판, 공지사항, 활동 사진 앨범, 마이페이지, 관리자 기능을 제공하는 것을 목표로 합니다.

## Tech Stack

- React
- TypeScript
- REST API
- CSS / Tailwind CSS

## Related Repository

- Server: `Dcom-KHU/intranet-server`

## Branch Convention

- `main`: 안정 버전
- `feature/*`: 기능 개발
- `fix/*`: 버그 수정
- `docs/*`: 문서 수정
- `chore/*`: 설정 및 기타 작업

## Branch Name

- `feat/register`
- `feat/gallery`
- `feat/exam-archive`
- `feat/manage`
<!--
- `fix/login-error`
- `docs/readme-update`
- `chore/project-setup`
  -->

## Development Rule

1. `main` 브랜치에 직접 push하지 않습니다.
2. 모든 작업은 Issue 단위로 진행합니다.
3. 작업 시작 전 GitHub Projects에서 Issue 상태를 `In Progress`로 변경합니다.
4. 기능별 브랜치를 생성하여 작업합니다.
5. 작업 완료 후 Pull Request를 생성합니다.
6. Pull Request에는 관련 Issue 번호를 연결합니다.
7. 확인 후 `main` 브랜치에 merge합니다.

## Commit Message Convention

- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Docs`: 문서 수정
- `Style`: 코드 포맷팅, 스타일 수정
- `Refactor`: 코드 리팩토링
- `Chore`: 설정, 빌드, 패키지 등 기타 작업

## Issue & Project Management

프로젝트 관리는 GitHub Projects의 `D.COM Intranet MVP` 보드에서 진행합니다.

Status는 다음 기준으로 관리합니다.

- `Backlog`: 해야 할 일 후보
- `Ready`: 작업 예정
- `In Progress`: 작업 중
- `Review`: PR 리뷰 또는 확인 중
- `Done`: 완료

## Notes

- 백엔드 API 연동은 `intranet-server` 레포지토리의 API 명세를 기준으로 진행합니다.
- 환경변수 파일은 Git에 커밋하지 않습니다.
- `.env`, `node_modules`, `dist`, `build` 등은 `.gitignore`에 포함해야 합니다.
