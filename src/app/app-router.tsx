// src/app/router.tsx

import { Routes, Route } from "react-router-dom";
import AppLayout from "./app-layout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ExamArchive from "../pages/ExamArchive";
import ExamArchiveDetail from "../pages/ExamArchiveDetail";
import ExamArchiveUpload from "../pages/ExamArchiveUpload";
import InfoSharing from "../pages/InfoSharing";
import Manage from "../pages/Manage";
import Profile from "../pages/Profile";
import Notice from "../pages/Notice";
import Gallery from "../pages/Gallery";
import GalleryDetail from "../pages/GalleryDetail";
import GalleryUpload from "../pages/GalleryUpload";

import ProtectedRoute from "../components/ProtectedRoute";


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
    path: "/info-sharing",
    element: <InfoSharing />,
    protected: true,
  },
  {
    path: "/notice",
    element: <Notice />,
    protected: true,
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
    path: "/manage",
    element: <Manage />,
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

