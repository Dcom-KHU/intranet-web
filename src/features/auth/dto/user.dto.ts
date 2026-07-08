export default interface UserDto {
  userId: number;
  loginId: string;
  name: string;
  email: string;
  studentId: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
  status?: "PENDING" | "APPROVED" | "REJECTED";
  requirePasswordChange: boolean;
}