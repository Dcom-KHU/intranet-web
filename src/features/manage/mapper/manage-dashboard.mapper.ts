import type { AdminDashboardDto } from "../dto/manage-dashboard.dto";
import type { AdminDashboard } from "../types/manage-dashboard.type";

export const toAdminDashboard = (
  dto: AdminDashboardDto,
): AdminDashboard => ({
  pendingUserCount: dto.pendingUserCount,
  totalUserCount: dto.totalUserCount,
  recentSignupRequests: dto.recentSignupRequests.map((user) => ({
    id: user.userId,
    name: user.name,
    studentNumber: user.studentId,
    email: user.email,
    requestedAt: user.createdAt.slice(0, 10),
  })),
  recentActiveMembers: dto.recentActiveMembers.map((user) => ({
    id: user.userId,
    name: user.name,
    studentNumber: user.studentId,
    lastLoginAt: user.lastLoginAt.slice(0, 10),
  })),
  postCounts: {
    notices: dto.postCounts.noticeCount,
    archives: dto.postCounts.archiveCount,
    infoPosts: dto.postCounts.infoPostCount,
    photoPosts: dto.postCounts.photoPostCount,
  },
});
