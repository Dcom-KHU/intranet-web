export interface VerifyEmailCodeRequestDto {
  email: string;
  verificationCode: string;
}

export interface VerifyEmailCodeResponseDto {
  message: string;
  email: string;
}
