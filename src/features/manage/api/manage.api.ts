import type { User } from "../../auth/types/user.type";
import { mockUsers } from "../../../mocks/user-data.mock";
import { api } from "@/api/client";
import type { AdminDashboardResponseDto } from "../dto/manage-dashboard.dto";
import { toAdminDashboard } from "../mapper/manage-dashboard.mapper";

export const getAdminDashboard = async () => {
  const response = await api.get<AdminDashboardResponseDto>(
    "/api/admin/dashboard",
  );

  console.log(response.data)
  return toAdminDashboard(response.data.data);
};

export const approveUser = async (userId: number) => {
  const response = await api.patch(
    `/api/admin/users/${userId}/approve`,
  );

  console.log(userId, '가 승인되었습니다.')
  return response.data;
};

export const rejectUser = async (userId: number) => {
  const response = await api.patch(
    `/api/admin/users/${userId}/reject`,
  );

  console.log(userId, '가 거부되었습니다.')
  return response.data;
};

// 나중에 axios로 바뀔 파일
export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 300);
    });
  },
};
