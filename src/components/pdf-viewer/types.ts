import { PDFDataRangeTransport } from 'pdfjs-dist';


export type PdfFileType =
  | string
  | File
  | {
      url: string;
      data?: Uint8Array;
      range?: PDFDataRangeTransport;
    };

export interface PdfViewerProps{
    pdfFile: PdfFileType;
    title?: string;
}