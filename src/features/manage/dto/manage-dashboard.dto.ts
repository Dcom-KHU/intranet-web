export interface DashboardSignupRequestDto {
  userId: number;
  name: string;
  studentId: string;
  email: string;
  createdAt: string;
}

export interface DashboardActiveMemberDto {
  userId: number;
  name: string;
  studentId: string;
  lastLoginAt: string;
}

export interface AdminDashboardDto {
  pendingUserCount: number;
  totalUserCount: number;
  recentSignupRequests: DashboardSignupRequestDto[];
  recentActiveMembers: DashboardActiveMemberDto[];
  postCounts: {
    noticeCount: number;
    archiveCount: number;
    infoPostCount: number;
    photoPostCount: number;
  };
}

export interface AdminDashboardResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: AdminDashboardDto;
}
