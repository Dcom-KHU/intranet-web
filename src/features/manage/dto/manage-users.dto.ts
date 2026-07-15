export interface ManagedUserDto {
  userId: number;
  loginId: string;
  name: string;
  studentId: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastLoginAt: string | null;
}

export interface ManageUsersResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    userList: ManagedUserDto[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };
}
