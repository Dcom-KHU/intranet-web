import type { ManageUsersResponseDto } from "../dto/manage-users.dto";
import type { ManageUsersPage } from "../types/manage-users.type";
import type { ManageUserDetailDto } from "../dto/manage-user-detail.dto";
import type { ManageUserDetail } from "../types/manage-users.type";

export const toManageUsersPage = (
  response: ManageUsersResponseDto["data"],
): ManageUsersPage => ({
  users: response.userList.map((user) => ({
    id: user.userId,
    userID: user.loginId,
    name: user.name,
    studentNumber: user.studentId,
    email: user.email,
    role: user.role,
    status: user.status,
    lastLoginAt: user.lastLoginAt?.slice(0, 10) ?? "-",
  })),
  ...response.pageInfo,
});

export const toManageUserDetail = (
  user: ManageUserDetailDto,
): ManageUserDetail => ({
  id: user.userId,
  userID: user.loginId,
  name: user.name,
  studentNumber: user.studentId,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  lastLoginAt: user.lastLoginAt?.slice(0, 10) ?? "-",
});
