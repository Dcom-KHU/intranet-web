export interface DashboardSignupRequest {
  id: number;
  name: string;
  studentNumber: string;
  email: string;
  requestedAt: string;
}

export interface DashboardActiveMember {
  id: number;
  name: string;
  studentNumber: string;
  lastLoginAt: string;
}

export interface AdminDashboard {
  pendingUserCount: number;
  totalUserCount: number;
  recentSignupRequests: DashboardSignupRequest[];
  recentActiveMembers: DashboardActiveMember[];
  postCounts: {
    notices: number;
    archives: number;
    infoPosts: number;
    photoPosts: number;
  };
}
