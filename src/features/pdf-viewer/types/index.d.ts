interface FileDetails {
  status: string;
  _id: string;
  name: string;
  key: string;
  type: string;
  baseUrl: string;
  created_at: string;
  updatedAt: string;
  createdAt: string;
}
interface ContentItem {
  fileId: FileDetails;
}

export interface PdfDetails {
  _id: string;
  title: string;
  content: ContentItem[];
}

export interface PdfDetailsResponse {
  success: boolean;
  data: PdfDetails[];
}
