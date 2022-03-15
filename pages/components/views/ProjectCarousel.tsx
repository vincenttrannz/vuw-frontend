import React from "react";
import { Project } from '../../../compilers/type'
import Slider from "react-slick";
import { getSingleStrapiMedia } from "../../../lib/fetchData";
import ImgCaption from '../views/ImgCaption';
import ChevronPrev from '../../../public/chevron-prev.svg';
import ChevronNext from '../../../public/chevron-next.svg';

type ProjectDataProps = {
  projectData: Project["attributes"];
}

export default function ProjectCarousel({projectData}:ProjectDataProps) {
  // Configure settings for React Slick
  function NextArrow(props:any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ChevronNext className="chevron-next"/> 
      </div>
    );
  }
  
  function PrevArrow(props:any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ChevronPrev className="chevron-prev"/>
      </div>
    );
  }

  const sliderSettings = {
    dots: false,
    dotsClass: "desktop-slick slick-dots slick-thumb",
    focusOnSelect: false,
    autoplay: true,
    autoplaySpeed: 8000,
    draggable: true,
    infinite: true,
    speed: 500,
    fade: true,
    arrows: true,
    adaptiveHeight: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
  };
  
  return (
    <Slider {...sliderSettings}>
      {
        projectData.ProjectImages.data.map((project:any, i:number) => {
          console.log(project);
          return (
            <React.Fragment key={i}>
              <img alt={`${project.attributes.alternativeText} - image ${i}`} key={i} src={getSingleStrapiMedia(project)}></img>
              <ImgCaption className="mx-0 my-1" caption={project.attributes.caption}/>
            </React.Fragment>
          )
        }
        )
      }
    </Slider>
  );
}
