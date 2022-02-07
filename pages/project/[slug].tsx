import type { NextPage, GetStaticProps } from 'next';
import qs from 'qs';
import HeadData from "../components/HeadData";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia, getSingleStrapiMedia, getStrapiData } from "../../lib/fetchData";

const project: NextPage<any> = ({project}) => {
  const projectData = project.data[0].attributes;
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
          // If the project just contain images
          (projectData.ImagesCarousel) && 
          <Slider {...sliderSettings}>
            {
              projectData.ProjectImages.data.map((project:any, i:number) => <img key={i} src={getSingleStrapiMedia(project)}></img>)
            }
          </Slider>
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
    populate: ["*", "SeoData.ShareImage", "ProjectImages"]
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