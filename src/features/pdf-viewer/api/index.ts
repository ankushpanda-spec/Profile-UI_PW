import {ApiClient} from '@pw-tech/web-sdk';
import pdfDetailApi from './apiEndpoints';
import buildParams from '../lib';
import {PdfDetailsResponse} from '../types';

const getPdfDetails = async (
  params: {
    type?: string;
    programId?: string;
    subjectId?: string;
    chapterId?: string;
    topicId?: string;
    page?: number;
  },
  contentId: string = ''
) => {
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
  const res = await ApiClient.get<PdfDetailsResponse>(url, {});
  return res.data;
};

export default getPdfDetails;
