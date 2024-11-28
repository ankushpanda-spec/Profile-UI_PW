import { useState, useEffect } from "react";
import PdfViewer from "@/components/pdf-viewer/PdfViewer";
import { getPdfDetails } from "@/api";
import { useSearchParams } from "react-router-dom";

const Pdf = () => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfTitle, setPdfTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [searchParams] = useSearchParams();
  const contentId  = searchParams.get("contentId")?.toString();
  const url = searchParams.get("pdfUrl");

  useEffect(() => {
    if(url && contentId){
      setError("Invalid request");
      setLoading(false);
    }
    if (url) {
      setPdfUrl(url);
      setLoading(false);
      return;
    }
    if (contentId) {
      async function fetchData() {
        try {
          const res: any = await getPdfDetails({}, contentId);
          if (res && res.data) {
            const pdfDetails = res.data[0];
            const src =
              pdfDetails.content[0]?.fileId.baseUrl +
                pdfDetails.content[0]?.fileId.key || "";
            setPdfUrl(src);
            setPdfTitle(pdfDetails.title); 
          } else {
            setError("No data available.");
          }
        } catch (error) {
          setError("Failed to load PDF.");
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    } else {
      setError("Invalid request");
      setLoading(false);
    }
  }, [contentId, url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <PdfViewer pdfFile={pdfUrl} title={pdfTitle} />;
};

export default Pdf;
