import type { NextPage, GetStaticProps } from 'next';
import React, { useState } from 'react';
import qs from 'qs';
import HeadData from "../components/HeadData";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { pdfjs, Document, Page } from 'react-pdf';
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia, getSingleStrapiMedia } from "../../lib/fetchData";

const project: NextPage<any> = ({project}) => {
  const projectData = project.data[0].attributes;

  // React-pdf appendancies
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  const [numPages, setNumPages] = useState<(number)>();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }:any) {
    setNumPages(numPages);
  }

  const goToNextPage = () => {
    if(numPages && pageNumber < numPages) setPageNumber(pageNumber+1)
  };
  const goToPrevPage = () => {
    if(pageNumber > 1) setPageNumber(pageNumber-1)
  };

  // Configure settings for React Slick
  const sliderSettings = {
    dots: true,
    dotsClass: "desktop-slick slick-dots slick-thumb",
    focusOnSelect: false,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable: true,
    infinite: true,
    speed: 500,
    arrows: true,
    adaptiveHeight: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  console.log(projectData);
  return (
    <>
      <HeadData
        title={projectData.ProjectTitle}
        description={projectData.SeoData.MetaDescription}
        image={getStrapiMedia(projectData.SeoData.ShareImage)}
      />
      <Container>
        <h2>{projectData.ProjectTitle}</h2>
        {
          // If the project is 3D project
          (projectData.Project3D) &&
          <div className='iframe-container'>
            <iframe title="Student Project" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-trackin="true" execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true" src={projectData.Project3DLink}></iframe>
          </div>
        }
        {
          // If the project is PDF
          (projectData.ProjectPDF) &&
          <div>
            <Document
              file={getStrapiMedia(projectData.ProjectPDFLink)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
            <div>
              <button onClick={goToNextPage}>Next</button>
              <button onClick={goToPrevPage}>Prev</button>
            </div>
          </div>
        }
        {
          // If the project just contain images
          (projectData.ImagesCarousel) && 
          <Slider {...sliderSettings}>
            {
              projectData.ProjectImages.data.map((project:any, i:number) => <img alt={`${projectData.ProjectTitle} - image ${i}`} key={i} src={getSingleStrapiMedia(project)}></img>)
            }
          </Slider>
        }
        {
          // If the project is Code base
          <div>
            <iframe height="500" width="100%" scrolling="no" title={projectData.ProjectTitle} src={projectData.ProjectCodeLink} frameBorder="no" loading="lazy" allowFullScreen></iframe>
          </div>
        }
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const projects = await fetchAPI("/api/projects");
  return {
    paths: projects.data.map((project:any) => ({
      params: {
        slug: project.attributes.Slug
      },
    })),
    fallback: false,
  };
};

export const getStaticProps:GetStaticProps = async ({params}) => {
  const projectQuery = qs.stringify({
    filters: {
      Slug: `${params ? params.slug : ""}`
    },
    populate: ["*", "SeoData.ShareImage", "ProjectImages", "ProjectPDFLink"]
  }, {
    encodeValuesOnly: true,
  })
  const project = await fetchAPI(`/api/projects?${projectQuery}`);

  return {
    props: { project },
    revalidate: 1,
  }
};

export default project;