// src/app/router.tsx

import { Routes, Route } from "react-router-dom";
import AppLayout from "./app-layout";

import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import ExamArchive from "../pages/exam-archive/ExamArchive";
import ExamArchiveDetail from "../pages/exam-archive/ExamArchiveDetail";
import ExamArchiveUpload from "../pages/exam-archive/ExamArchiveUpload";
import ExamArchiveEdit from "../pages/exam-archive/ExamArchiveEdit";
import InfoSharing from "../pages/info-sharing/InfoSharing";
import InfoSharingDetail from "../pages/info-sharing/InfoSharingDetail";
import InfoSharingEdit from "../pages/info-sharing/InfoSharingEdit";
import Manage from "../pages/manage/Manage";
import ManagePendingUsers from "../pages/manage/ManagePendingUsers";
import ManageUsers from "../pages/manage/ManageUsers";
import Profile from "../pages/Profile";
import Notice from "../pages/notice/Notice";
import NoticeDetail from "../pages/notice/NoticeDetail";
import NoticeUpload from "../pages/notice/NoticeUpload";
import NoticeEdit from "../pages/notice/NoticeEdit";
import Gallery from "../pages/gallery/Gallery";
import GalleryDetail from "../pages/gallery/GalleryDetail";
import GalleryUpload from "../pages/gallery/GalleryUpload";
import GalleryEdit from "../pages/gallery/GalleryEdit";

import ProtectedRoute from "../components/ProtectedRoute";
import InfoSharingUpload from "../pages/info-sharing/InfoSharingUpload";



export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map(renderRoute)}

      {/* Layout Routes */}
      <Route element={<AppLayout />}>
        {protectedRoutes.map(renderRoute)}
      </Route>
    </Routes>
  );
}

interface AppRoute {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  adminOnly?: boolean;
}

const publicRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  }
];

const protectedRoutes: AppRoute[] = [
  {
    path: "/home",
    element: <Home />,
    protected: true,
  },
  {
    path: "/exam-archive",
    element: <ExamArchive />,
    protected: true,
  },
  {
    path: "/exam-archive/upload",
    element: <ExamArchiveUpload />,
    protected: true,
  },
  {
    path: "/exam-archive/:id",
    element: <ExamArchiveDetail />,
    protected: true,
  },
  {
    path: "/exam-archive/:archiveId/edit/:postId",
    element: <ExamArchiveEdit />,
    protected: true,
  },
  {
    path: "/info",
    element: <InfoSharing />,
    protected: true,
  },
  {
    path: "/info/:id",
    element: <InfoSharingDetail />,
    protected: true,
  },
  {
    path: "/info/:id/edit",
    element: <InfoSharingEdit />,
    protected: true,
  },
  {
    path: "/info/upload",
    element: <InfoSharingUpload />,
    protected: true,
  },
  {
    path: "/notice",
    element: <Notice />,
    protected: true,
  },
  {
    path: "/notice/:id",
    element: <NoticeDetail />,
    protected: true,
  },
  {
    path: "/notice/upload",
    element: <NoticeUpload />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/notice/:id/edit",
    element: <NoticeEdit />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/gallery",
    element: <Gallery />,
    protected: true,
  },
  {
    path: "/gallery/upload",
    element: <GalleryUpload />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/gallery/:id",
    element: <GalleryDetail />,
    protected: true,
  },
  {
    path: "/gallery/:id/edit",
    element: <GalleryEdit />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/manage",
    element: <Manage />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/manage/pending",
    element: <ManagePendingUsers />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/manage/users",
    element: <ManageUsers />,
    protected: true,
    adminOnly: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    protected: true,
  },
];

function renderRoute(route: AppRoute) {
  let element = route.element;

  if (route.protected) {
    element = (
      <ProtectedRoute requireAdmin={route.adminOnly}>
        {element}
      </ProtectedRoute>
    );
  }

  return (
    <Route
      key={route.path}
      path={route.path}
      element={element}
    />
  );
}

