import type { SignupRequestDto } from "../dto/signup.dto";
import type { SignupInput } from "../types/signup.type";

export const toSignupRequestDto = (
  input: SignupInput,
): SignupRequestDto => ({
  loginId: input.userID,
  password: input.password,
  name: input.name,
  studentId: input.studentNumber,
  email: input.email,
  phoneNumber: input.phoneNumber,
});
