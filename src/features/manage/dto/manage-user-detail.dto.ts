export interface ManageUserDetailDto {
  userId: number;
  loginId: string;
  name: string;
  studentId: string;
  email: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "REJECTED";
  lastLoginAt: string | null;
}

export interface ManageUserDetailResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: ManageUserDetailDto;
}
