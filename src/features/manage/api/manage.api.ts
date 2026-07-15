import { api } from "@/api/client";
import type { AdminDashboardResponseDto } from "../dto/manage-dashboard.dto";
import { toAdminDashboard } from "../mapper/manage-dashboard.mapper";
import type { PendingUsersResponseDto } from "../dto/pending-users.dto";
import { toPendingUsersPage } from "../mapper/pending-users.mapper";
import type { ManageUsersResponseDto } from "../dto/manage-users.dto";
import { toManageUsersPage } from "../mapper/manage-users.mapper";

export interface ManageUsersRequest {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export const getManageUsers = async ({
  keyword,
  page = 0,
  size = 10,
  sort,
}: ManageUsersRequest = {}) => {
  const response = await api.get<ManageUsersResponseDto>(
    "/api/admin/users",
    {
      params: {
        ...(keyword ? { keyword } : {}),
        page,
        size,
        ...(sort ? { sort } : {}),
      },
    },
  );

  return toManageUsersPage(response.data.data);
};

export interface PendingUsersRequest {
  page?: number;
  size?: number;
  sort?: string[];
}

// 승인 대기 목록 조회
export const getPendingUsers = async ({
  page = 0,
  size = 10,
  sort,
}: PendingUsersRequest = {}) => {
  const response = await api.get<PendingUsersResponseDto>(
    "/api/admin/users/pending",
    { params: { page, size, ...(sort ? { sort } : {}) } },
  );

  return toPendingUsersPage(response.data.data);
};

// 관리자 대시보드 조회
export const getAdminDashboard = async () => {
  const response = await api.get<AdminDashboardResponseDto>(
    "/api/admin/dashboard",
  );

  console.log(response.data)
  return toAdminDashboard(response.data.data);
};

// 사용자 승인
export const approveUser = async (userId: number) => {
  const response = await api.patch(
    `/api/admin/users/${userId}/approve`,
  );

  console.log(userId, '가 승인되었습니다.')
  return response.data;
};

// 사용자 거절
export const rejectUser = async (userId: number) => {
  const response = await api.patch(
    `/api/admin/users/${userId}/reject`,
  );

  console.log(userId, '가 거부되었습니다.')
  return response.data;
};
