import { useState, useEffect } from "react";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import { getPdfDetails } from "@/api";
import { useParams } from "react-router-dom";


const Pdf = () => {
  const {contentId} = useParams()
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfTitle, setPdfTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res : any = await getPdfDetails({}, contentId);
        if (res && res.data) {
          const pdfDetails = res.data[0];
          const src = pdfDetails.content[0]?.fileId.baseUrl + pdfDetails.content[0]?.fileId.key || '';
          setPdfUrl(src);
          setPdfTitle(pdfDetails.title);
        } else {
          setError("No data available.");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load PDF.");
      } finally {
        setLoading(false);
      }
    }
  console.log("ID" , contentId)
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PdfViewer pdfFile={pdfUrl} title={pdfTitle}/>
  );
};

export default Pdf;
