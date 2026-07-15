export interface UpdateInfoPostRequestDto {
  title: string;
  content: string;
  deleteFileIds: number[];
}

export interface UpdateInfoPostFileDto {
  fileId: number;
  originalFileName: string;
  fileUrl: string;
  fileSize: number;
  contentType: string;
}

export interface UpdateInfoPostResponseDataDto {
  postId: number;
  title: string;
  content: string;
  updatedAt: string;
  files: UpdateInfoPostFileDto[];
}

export interface UpdateInfoPostResponseDto {
  success: boolean;
  status: number;
  message: string;
  data: UpdateInfoPostResponseDataDto;
}
