import React, { useState, useRef ,useEffect , useMemo} from 'react'
import {useScreen} from '@pw-tech/omni-context';
import { pdfjs, Document, Page } from 'react-pdf'

import { MenuIcon, ZoomIn, ZoomOut } from '../icons'
import s from './index.module.css'
import cn from 'clsx'

import { ChevronLeft , ChevronRight} from '@/assets/icons'
import { Typography , Tooltip } from '@pw-tech/omni-ui'
import { PdfViewerProps } from './types';
import Mode from '../icons/pdf-viewer/Mode';



export default function PdfViewer(props:PdfViewerProps){

  const {pdfFile = "demo.pdf"} = props;
  const {isMobile} = useScreen();
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [darkMode , setDarkMode] = useState<boolean>(false)

  const mainContentRef = useRef<HTMLDivElement>(null)
  
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([])
  


  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => { 
   setPageNumber(1); 
   setDarkMode(false)
  }, [isMobile]);


  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const scrollToPage = (page: number) => {
    pageRefs.current[page - 1]?.scrollIntoView({ behavior: 'auto' });
    setPageNumber(page); // Update displayed page only
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = Math.min(Math.max(1, prevPageNumber + offset), numPages);
      scrollToPage(newPageNumber); // Scroll to the new page without affecting displayedPage
      return newPageNumber;
    });
  };

  const changeScale = (newScale: number) => {
    setScale(Math.min(Math.max(0.5, newScale), 1.5))
  }


  useEffect(() => {
    const handleScroll = () => {
      if (!mainContentRef.current) return;

      const { scrollTop, clientHeight } = mainContentRef.current;
      const middleOfViewport = scrollTop + clientHeight / 2;

      let closestPage = 1;
      let minDistance = Infinity;

      pageRefs.current.forEach((ref, index) => {
        if (ref) {
          const { offsetTop, offsetHeight } = ref;
          const distance = Math.abs(offsetTop + offsetHeight / 2 - middleOfViewport);
          if (distance < minDistance) {
            minDistance = distance;
            closestPage = index + 1;
          }
        }
      });

      setPageNumber(closestPage); // Update pageNumber based on scroll only
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
  }, [numPages , isMobile]);

  useEffect(() => {
    if (sidebarRef.current && thumbnailRefs.current[pageNumber - 1]) {
      thumbnailRefs.current[pageNumber - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [pageNumber])

  function renderPagination(){
    return(
      <div className={s.headerContainer}>
      
        <ChevronLeft className={cn(s.icon , {[s.disabled] : pageNumber ===1 , [s.darkMode]: darkMode}) } onClick ={()=> changePage(-1)}/>
      
      
        <Typography > {pageNumber}  /   {numPages} </Typography>
        
       
      
      
        <ChevronRight className={cn(s.icon , {[s.disabled] : pageNumber === numPages , [s.darkMode]: darkMode}) } onClick={() => changePage(1)} />
      
    </div>
    )
  }

  function renderHeader(){
    return(
      <header className={cn(s.headerWrapper , {[s.darkMode]: darkMode})}>
        
      <MenuIcon className={cn(s.icon, {[s.darkMode]: darkMode})} onClick={() => setShowSidebar(!showSidebar)}/>
      
      {renderPagination()}
    <div className={s.headerContainer}>
      
        <ZoomOut className={cn(s.icon , {[s.disabled] : scale === 0.5  , [s.darkMode]: darkMode}) } onClick={() => changeScale(scale - 0.1)} />
     
      <input
        type="range"
        min={0.5}
        max={1.5}
        step={0.1}
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
        className="size-44"
        aria-label="Zoom Level"
      />
      
        
        
     <ZoomIn className= {cn(s.icon , {[s.disabled] : scale === 1.5  , [s.darkMode]: darkMode}) } onClick={() => changeScale(scale + 0.1)}/>
      
    
      <Mode className={cn(s.icon , {[s.darkMode]: darkMode}) } onClick={()=> setDarkMode(!darkMode)}/>
      
        
    </div>
  </header>
    )
  }

  function renderSidebar(){
    return(
      <aside className={cn(s.sidebarWrapper , {[s.showSidebar]: showSidebar , [s.darkMode]:darkMode}) } ref={sidebarRef}>
           
            
              <Document
                file={pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className={s.sidebarSubContainer}
              >
                {Array.from(new Array(numPages), (el, index) => 
                <div key={index} ref={(el) => (thumbnailRefs.current[index] = el)}>
       
        <div
      
      className= {cn(s.sidebarPage, { [s.selectedPage]: pageNumber === index+1 })}
      
     
      onClick={() => {
        scrollToPage(index + 1);
      }}
    >
      <Page
        pageNumber={index+1}
        height={200}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
      
    </div>
   <Typography className={s.sidebarPageNo}>
   {index+ 1}
 </Typography> 
 </div>

)}
  </Document>
 
  </aside>
        

    )
  }

  function renderMainContent(scale:number){
    return(
      <main ref={mainContentRef} className={cn(s.mainContentWrapper , {[s.darkMode]:darkMode})}>
          
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
         {Array.from({ length: numPages }, (_, index) => (
          <div
           key={index}
           ref={(el) => (pageRefs.current[index] = el)}
           className={s.mainContentContainer}
          >
           <Page pageNumber={index + 1} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
         </div>
        ))}
     </Document>
          
        </main>
    )
  }

  return (
   
      <>
      {!isMobile ? 
      <div className={s.container}>
      {renderHeader()}
      <div className={cn(s.subContainer  , {[s.darkMode]: darkMode})}>
        {renderSidebar()}
        {renderMainContent(scale)}
      </div>
    </div>
  :
  (
   <>
   <Typography className='flex justify-center items-center p-4'>{pageNumber} / {numPages}</Typography>

  {renderMainContent(0.6)}
   </>
   )  
  }
      </>
        
      
    
  );
}