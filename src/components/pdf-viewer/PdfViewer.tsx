import React, { useState, useRef ,useEffect , useMemo} from 'react'
import {useScreen} from '@pw-tech/omni-context';
import { pdfjs, Document, Page } from 'react-pdf'

import { MenuIcon, ZoomIn, ZoomOut } from '../icons'
import s from './index.module.css'
import cn from 'clsx'

import { ChevronLeft , ChevronRight} from '@/assets/icons'
import { Typography , Tooltip, Button, InputField } from '@pw-tech/omni-ui'
import { PdfViewerProps } from './types';
import Mode from '../icons/pdf-viewer/Mode';
import FullScreen from '../icons/pdf-viewer/FullScreen';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import Rotate from '../icons/pdf-viewer/Rotate';



export default function PdfViewer(props:PdfViewerProps){

  const {pdfFile = "demo.pdf"} = props;
  const {isMobile} = useScreen();
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)
  const [darkMode , setDarkMode] = useState<boolean>(false)
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [rotation, setRotation] = useState<number>(0)
  const [inputPageNumber, setInputPageNumber] = useState<string>('1')

  const mainContentRef = useRef<HTMLDivElement>(null)
  
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null)
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([])
  const tooltipVariant = darkMode ? "dark" : "light";


  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  useEffect(() => { 
   setPageNumber(1); 
   setDarkMode(false)
   setRotation(0)
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
    setScale(Math.min(Math.max(0.25, newScale), 2))
  }
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };
  const rotatePages = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360)
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
      setInputPageNumber(closestPage.toString())
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
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setInputPageNumber(value)
  }

  const handlePageInputBlur = () => {
    const newPage = parseInt(inputPageNumber, 10)
    if (!isNaN(newPage) && newPage >= 1 && newPage <= numPages) {
      scrollToPage(newPage)
    } else {
      setInputPageNumber(pageNumber.toString())
    }
  }

  const handlePageInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlur()
    }
  }

  function renderHeader(){
    return(
      <header className={cn(s.headerWrapper , {[s.darkMode]: darkMode})}>
      <div>
      <MenuIcon
  className={cn(s.icon, { [s.darkMode]: darkMode })}
  onClick={() => {
    setShowSidebar(!showSidebar);
    
   
  }}
/>

      </div>
      <div className={s.headerCenter}>
      <Tooltip
      label={<ChevronLeft className={cn(s.icon , {[s.disabled] : pageNumber ===1 , [s.darkMode]: darkMode}) } onClick ={()=> changePage(-1)}/>
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
        Previous Page
      </Typography>
    </Tooltip>
        
    <input
            value={inputPageNumber}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            onKeyUp={handlePageInputKeyPress}
            className={cn(s.pageInput , {[s.darkMode]: darkMode})}
            type="text"
            size={2}
            
          />
        <Typography >   /   {numPages} </Typography>
        
        <Tooltip
      label={<ChevronRight className={cn(s.icon , {[s.disabled] : pageNumber === numPages , [s.darkMode]: darkMode}) } onClick={() => changePage(1)} />
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
     <Typography className={s.tooltip}>Next Page</Typography>
    </Tooltip>
      
      
        
      
    
      <Typography color="text-body-2">|</Typography>
      <Tooltip
      label={<ZoomOut className={cn(s.icon , {[s.disabled] : scale === 0.25  , [s.darkMode]: darkMode}) } onClick={() => changeScale(scale - 0.05)} />
     
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
        Zoom Out
      </Typography>
    </Tooltip>
        
        <Typography>{Math.round(scale * 100)} %</Typography>

      
        
        <Tooltip
      label={<ZoomIn className= {cn(s.icon , {[s.disabled] : scale === 2 , [s.darkMode]: darkMode}) } onClick={() => changeScale(scale + 0.05)}/>
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
        Zoom In
      </Typography>
    </Tooltip> 
     
      
    <Typography color="text-body-2">|</Typography>
    <Tooltip
      label={ <Mode className={cn(s.icon , {[s.darkMode]: darkMode}) } onClick={()=> setDarkMode(!darkMode)}/>
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
       {`Switch to the ${darkMode ? 'light' : 'dark'} theme`}
      </Typography>
    </Tooltip> 
    <Tooltip
      label={ <FullScreen className={cn(s.icon , {[s.darkMode]: darkMode}) } onClick={()=> toggleFullScreen()}/>
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
       Full Screen
      </Typography>
    </Tooltip> 
    <Tooltip
      label={ <Rotate className={cn(s.icon , {[s.darkMode]: darkMode}) } onClick={()=> rotatePages()}/>
    }
      
      origin="center"
      position="bottom"
      variant={tooltipVariant}
    >
      <Typography className={s.tooltip}>
       Rotate
      </Typography>
    </Tooltip> 
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
                rotate={rotation}
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
        height={150}
        
        
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
          
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} rotate={rotation}>
         {Array.from({ length: numPages }, (_, index) => (
          <div
           key={index}
           ref={(el) => (pageRefs.current[index] = el)}
           className={s.mainContentContainer}
          >
           <Page pageNumber={index + 1} scale={scale} renderTextLayer={true} renderAnnotationLayer={true} />
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