import React , {useEffect , useState , useRef} from 'react'
import { pdfjs , Document, Page } from 'react-pdf';
import s from './index.module.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { MenuIcon } from '../icons';

const PdfViewer = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1.0);
  const [show , setShow] = useState(true);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    console.log("Doc loaded")
    setTotalPages(numPages);
  
  }
  return (
    <div className='w-full h-screen flex flex-col'>
      {/* Header */}
      <header className= ' bg-neutral-700 h-80 w-full flex items-center justify-between text-white px-20 shrink-0'>
        <MenuIcon className='size-24 text-white' onClick ={() => setShow(!show)}/>
      </header>

      <div className='flex flex-row w-full h-screen border-t-2'>
        {/* Sidebar */}
        {show && 
       <aside
       className={`bg-neutral-700 min-w-[240px] h-screen flex flex-col items-center shadow-lg text-white`}
     >
       <Document
        file='demo.pdf'
         onLoadSuccess={onDocumentLoadSuccess}
         className="flex flex-col justify-start items-center overflow-y-auto h-full py-12 w-full"
       >
         {Array.from({ length: totalPages }, (_, index) => (
            <>
           <div
             key={index}
             className={`cursor-pointer relative my-2 ${
               pageNumber === index + 1 && 'border-[4px] border-blue-300'
             }`}
             onClick={() => setPageNumber(index + 1)}
           >
             <Page height={180} pageIndex={index} />
             
           </div>
           <p className="flex justify-center items-center text-white pb-8">{index + 1}</p>
           </>
         ))}
       </Document>
     </aside>
}
        {/* Main Content Area */}
        <main className="flex-1 bg-gray-200 h-full w-full flex flex-col items-center justify-center p-4">
          <div className="bg-white w-1/2 h-full flex items-center justify-center">
            <p className="text-gray-500">Main Page Content</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PdfViewer