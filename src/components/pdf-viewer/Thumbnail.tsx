import React, { useRef , useEffect } from 'react';
import { ThumbnailProps } from './types';
import { Document, Page } from 'react-pdf';
import s from './index.module.css';
import cn from 'clsx';
import { Typography } from '@pw-tech/omni-ui';

const Thumbnail: React.FC<ThumbnailProps> = ({
  pdfFile,
  pageNumber,
  numPages,
  rotation,
  onScrollToPage,
  showThumbnail,
  darkMode,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (sidebarRef.current && thumbnailRefs.current[pageNumber - 1]) {
      thumbnailRefs.current[pageNumber - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [pageNumber]);
  return (
    <aside
      className={cn(s.sidebarWrapper, {
        [s.showThumbnail]: showThumbnail,
        [s.darkMode]: darkMode,
      })}
      ref={sidebarRef}
    >
      <Document
        file={pdfFile}
        className={s.sidebarSubContainer}
        rotate={rotation}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div key={index} ref={(el) => (thumbnailRefs.current[index] = el)}>
            <div
              className={cn(s.sidebarPage, {
                [s.selectedPage]: pageNumber === index + 1,
              })}
              onClick={() => {
                onScrollToPage(index + 1);
              }}
            >
              <Page
                pageNumber={index + 1}
                height={150}
                width={150}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </div>
            <Typography className={s.sidebarPageNo}>{index + 1}</Typography>
          </div>
        ))}
      </Document>
    </aside>
  );
};

export default Thumbnail;
