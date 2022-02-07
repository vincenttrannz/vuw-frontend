import type { NextPage, GetStaticProps } from 'next';
import HeadData from "../components/HeadData";
import { Container } from "react-bootstrap";
import qs from 'qs';
import { fetchAPI } from "../../lib/api";

const project: NextPage<any> = ({project}) => {
  const projectData = project.data[0].attributes;
  console.log(projectData);
  return (
    <Container>
      <h2>{projectData.ProjectTitle}</h2>
      {
        (projectData.Project3D) ?
        <div className='iframe-container'>
          <iframe title="Student Project" frameBorder="0" allowFullScreen allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-trackin="true" execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true" src={projectData.Project3DLink}></iframe>
        </div>
        :
        <p>No 3D project</p>
      }
    </Container>
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
    populate: "*"
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