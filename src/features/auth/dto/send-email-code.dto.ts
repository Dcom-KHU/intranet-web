export interface SendEmailCodeRequestDto {
  email: string;
}

export interface SendEmailCodeResponseDto {
  message: string;
  expiresIn: number;
}
