export interface UpdateGalleryRequestDto {
  eventName: string;
  activityDate: string;
  place: string;
  description: string;
  deleteFileIds: number[];
}
