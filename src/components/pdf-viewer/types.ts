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

export interface ThumbnailProps {
  pdfFile: PdfFileType;
  pageNumber: number;
  numPages: number;
  rotation: number;
  showThumbnail:boolean;
  darkMode:boolean;
  onScrollToPage: (page: number) => void;
}
export interface HeaderProps {
  pdfFile:PdfFileType
  title?: string
  pageNumber: number
  numPages: number
  scale: number
  darkMode: boolean
  inputPageNumber: string
  onDarkModeToggle: () => void
  onSidebarToggle: () => void
  onScrollToPage: (page: number) => void;
  setInputPageNumber:React.Dispatch<React.SetStateAction<string>>
  setScale:React.Dispatch<React.SetStateAction<number>>
  setPageNumber:React.Dispatch<React.SetStateAction<number>>
  setRotation:React.Dispatch<React.SetStateAction<number>>
}
export interface TooltipProps {
  label: React.ReactNode
  title: string
  variant: 'light' | 'dark'
}

