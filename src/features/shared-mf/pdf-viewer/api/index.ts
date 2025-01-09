import { ApiClient } from "@pw-tech/web-sdk";
import { pdfDetailApi } from "./constant";
import { buildParams } from "../lib";

export const getPdfDetails  = async (params: {
    type?: string;
    programId?: string;
    subjectId?: string;
    chapterId?: string;
    topicId?: string;
    page?: number;
  }, contentId: string = '') => {
    
    try {
      const apiPath = pdfDetailApi;
  
      // Construct parameters
      const queryParams = buildParams({
        organizationId: process.env.PUBLIC_ORGANISATION_ID, 
        type: params.type || '',
        programId: params.programId,
        subjectId: params.subjectId,
        chapterId: params.chapterId,
        topicId: params.topicId || '',
        page: params.page,
        contentId,
      });
  
      // Full URL with query parameters
      const url = `${apiPath}?${queryParams.toString()}`;
      return ApiClient.get(url, {});
    } catch (error) {}}
