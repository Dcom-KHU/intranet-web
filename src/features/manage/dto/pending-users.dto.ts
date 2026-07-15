export interface PendingUserDto {
  userId: number;
  loginId: string;
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export interface PendingUsersResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: {
    pendingUserList: PendingUserDto[];
    pageInfo: {
      page: number;
      size: number;
      totalElements: number;
      totalPages: number;
    };
  };
}
