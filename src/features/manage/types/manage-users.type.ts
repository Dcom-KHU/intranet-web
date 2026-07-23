export interface ManagedUser {
  id: number;
  userID: string;
  name: string;
  studentNumber: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastLoginAt: string;
}

export interface ManageUsersPage {
  users: ManagedUser[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ManageUserDetail {
  id: number;
  userID: string;
  name: string;
  studentNumber: string;
  email: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
  lastLoginAt: string;
}
