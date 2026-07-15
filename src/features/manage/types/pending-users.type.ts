export interface PendingUser {
  id: number;
  userID: string;
  name: string;
  studentNumber: string;
  email: string;
  phoneNumber: string;
  requestedAt: string;
}

export interface PendingUsersPage {
  users: PendingUser[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
