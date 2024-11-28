import  {useState, useRef, useEffect} from 'react';
import {useScreen} from '@pw-tech/omni-context';
import {pdfjs, Document, Page} from 'react-pdf';
import s from './index.module.css';
import cn from 'clsx';
import {Typography, Tooltip} from '@pw-tech/omni-ui';
import {PdfViewerProps} from './types';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Thumbnail from './Thumbnail';

import Toolbar from './Toolbar';

export default function PdfViewer(props: PdfViewerProps) {
  const {pdfFile, title} = props;
  const {isMobile} = useScreen();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [showThumbnail, setShowThumbnail] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [inputPageNumber, setInputPageNumber] = useState<string>('1');
  const [pageDimensions , setPageDimensions] = useState({width:1 , height:1})
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const mainContentRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => {
    setPageNumber(1);
    setDarkMode(false);
    setRotation(0);
    setInputPageNumber('1');
  }, [isMobile]);

  function onDocumentLoadSuccess(pdf: pdfjs.PDFDocumentProxy): void {
    setNumPages(pdf.numPages);

    // Get the dimensions of the first page (assuming all pages has the same shape)
    pdf.getPage(1).then(page => {
      const viewport = page.getViewport({ scale: 1 });
      setPageDimensions({
        width: viewport.width,
        height: viewport.height,
      });
    });
  }
  useEffect(() => {
    function updateContainerSize() {
      if (mainContentRef.current) {
        setContainerSize({
          width: mainContentRef.current.offsetWidth - 32 ,
          height: mainContentRef.current.offsetHeight - 32,
        });
        console.log(mainContentRef.current.offsetWidth);
      }
    }
   
    updateContainerSize();
   
    window.addEventListener("resize", updateContainerSize);
    
    return () => window.removeEventListener("resize", updateContainerSize);
  }, [showThumbnail]);
  
  // Calculate scale factor when dimensions change
  useEffect(() => {
    if (pageDimensions && containerSize.width > 0 && containerSize.height > 0) {
      const scaleX = containerSize.width / pageDimensions.width;
      
      const newScale = Math.min(scaleX, 1);
      setScale(newScale);
    }
  }, [pageDimensions, containerSize]);

  const scrollToPage = (page: number) => {
    pageRefs.current[page - 1]?.scrollIntoView({behavior: 'auto'});
    setPageNumber(page); // Update displayed page only
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;

      const {scrollTop, clientHeight} = mainContentRef.current;
      const middleOfViewport = scrollTop + clientHeight / 2;

      let closestPage = 1;
      let minDistance = Infinity;

      pageRefs.current.forEach((ref, index) => {
        if (ref) {
          const {offsetTop, offsetHeight} = ref;
          const distance = Math.abs(
            offsetTop + offsetHeight / 2 - middleOfViewport
          );
          if (distance < minDistance) {
            minDistance = distance;
            closestPage = index + 1;
          }
        }
      });

      setPageNumber(closestPage); // Update pageNumber based on scroll only
      setInputPageNumber(closestPage.toString());
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [numPages, isMobile]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.01 : 0.01;

        setScale(prevScale => {
          const newScale = prevScale + delta;
          return Math.max(0.25, Math.min(newScale, 5));
        });
      }
    };
    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('wheel', handleWheel, {passive: false});
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isMobile]);

  

  function renderMainContent(scale: number) {
    return (
      <main
        ref={mainContentRef}
        className={cn(s.mainContentWrapper, {[s.darkMode]: darkMode})}
      >
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          rotate={rotation}
        >
          {Array.from({length: numPages}, (_, index) => (
            <div
              key={index}
              ref={el => (pageRefs.current[index] = el)}
              className={s.mainContentContainer}
            >
              <Page pageNumber={index + 1} scale={scale} />
             
            </div>
          ))}
        </Document>
      </main>
    );
  }
  return (
    <>
      {!isMobile ? (
        <div className={s.container}>
          <Toolbar
            pdfFile={pdfFile}
            title={title}
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            darkMode={darkMode}
            inputPageNumber={inputPageNumber}
            setPageNumber={setPageNumber}
            setScale={setScale}
            onDarkModeToggle={() => setDarkMode(!darkMode)}
            onSidebarToggle={() => setShowThumbnail(!showThumbnail)}
            setRotation={setRotation}
            setInputPageNumber={setInputPageNumber}
            onScrollToPage={scrollToPage}
          />
          <div className={cn(s.subContainer, {[s.darkMode]: darkMode})}>
            <Thumbnail
              pdfFile={pdfFile}
              pageNumber={pageNumber}
              numPages={numPages}
              rotation={rotation}
              onScrollToPage={scrollToPage}
              darkMode={darkMode}
              showThumbnail={showThumbnail}
            />
            {renderMainContent(scale)}
          </div>
        </div>
      ) : (
        <div className={s.mContainer}>
          <Typography className="flex justify-center">
            {pageNumber} / {numPages}
          </Typography>
           
          {renderMainContent(scale)}
        </div>
      )}
    </>
  );
}
