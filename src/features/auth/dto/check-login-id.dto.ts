export interface CheckLoginIdResultDto {
  isAvailable: boolean;
  message: string;
}

export interface CheckLoginIdAvailableResultDto {
  available: boolean;
  message: string;
}

export interface CheckLoginIdEnvelopeDto {
  message: string;
  data: {
    isAvailable?: boolean;
    available?: boolean;
    message?: string;
  };
}

export type CheckLoginIdResponseDto =
  | CheckLoginIdResultDto
  | CheckLoginIdAvailableResultDto
  | CheckLoginIdEnvelopeDto;
