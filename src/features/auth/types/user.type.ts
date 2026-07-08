// user.type.ts
export type User = {
  id: number;
  userID: string;
  email: string;
  name: string;
  studentNumber: string;
  phoneNumber: string;
  password: string;
  role: "USER" | "ADMIN";
  status?: "PENDING" | "APPROVED" | "REJECTED";
};
