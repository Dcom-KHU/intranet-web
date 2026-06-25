// user.type.ts
export type User = {
  id: number;
  userID: string;
  email: string;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  image: string;
  password: string;
  role: "USER" | "ADMIN";
  approvalStatus?: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt?: string;
  lastLoginAt?: string;
};
