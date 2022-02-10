import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { getStrapiMedia } from "../../lib/fetchData";

export default function ProjectPDF({projectData}: any) {
  // React-pdf appendancies
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };
  const goToPrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };
  
  return (
    <div>
      <Document
        file={getStrapiMedia(projectData.ProjectPDFLink)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div>
        <button onClick={goToNextPage}>Next</button>
        <button onClick={goToPrevPage}>Prev</button>
      </div>
    </div>
  );
}
