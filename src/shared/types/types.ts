export interface BatchStatusInfo {
  isScholar: boolean;
  batchUserSegment: string;
}
export interface getBatchStatusInfoResponse {
  success: boolean;
  data: BatchStatusInfo;
}
