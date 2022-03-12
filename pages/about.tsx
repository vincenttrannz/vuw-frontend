import type { NextPage } from "next";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from "react-bootstrap";
import PageHeroBanner from './components/views/PageHeroBanner'
import Link from "next/link";
import { About } from "../compilers/type";
import HeadData from "./components/HeadData";
import TextDivider from "./components/views/TextDivider";
import TwoColumnsBlock from "./layout/TwoColumnsBlock";
import ImgCaption from "./components/views/ImgCaption";
import ReactMarkdown from "react-markdown";

type AboutpageProps = {
  about: About;
};

const About: NextPage<AboutpageProps> = ({ about }) => {
  console.log("About Page data:", about);
  // About page main dependancies
  const AboutSeoData = getStrapiData(about).SeoData;
  const AboutShareImageSeo = getStrapiData(about).SeoData.ShareImage;
  const AboutHeroBanner = getStrapiMedia(getStrapiData(about).AboutHeroBanner);
  const AboutHeroCaption =
    getStrapiData(about).AboutHeroBanner.data.attributes.caption;
  // About Page Info Block dependancies
  const AboutPageInfoBlockTitle =
    getStrapiData(about).AboutPageInfoBlock.BlockTitle;
  const AboutPageInfoBlockParagraph =
    getStrapiData(about).AboutPageInfoBlock.BlockParagraph;
  const AboutPageInfoBlockImage = getStrapiMedia(
    getStrapiData(about).AboutPageInfoBlock.BlockImage
  );
  const AboutPageInfoBlockImageCaption =
    getStrapiData(about).AboutPageInfoBlock.BlockImage.data.attributes.caption;
  // First Grey block
  const FirstContentGreyBlockTitle =
    getStrapiData(about).FirstContentGreyBlock.BlockTitle;
  const FirstContentGreyBlockParagraph =
    getStrapiData(about).FirstContentGreyBlock.BlockRichText;
  const FirstContentGreyBlockBtnLink =
    getStrapiData(about).FirstContentGreyBlock.BlockButtonLink;
  // School of Architecture block
  const SchoolArchitectureBlockTitle =
    getStrapiData(about).ArchitectureSchool.BlockTitle;
  const SchoolArchitectureBlockParagraph =
    getStrapiData(about).ArchitectureSchool.BlockParagraph;
  const SchoolArchitectureBlockImage = getStrapiMedia(
    getStrapiData(about).ArchitectureSchool.BlockImage
  );
  const SchoolArchitectureBlockImageCaption =
    getStrapiData(about).ArchitectureSchool.BlockImage.data.attributes.caption;
  // Second Grey block
  const SecondContentGreyBlockTitle =
    getStrapiData(about).SecondContentGreyBlock.BlockTitle;
  const SecondContentGreyBlockParagraph =
    getStrapiData(about).SecondContentGreyBlock.BlockRichText;
  const SecondContentGreyBlockBtnLink =
    getStrapiData(about).SecondContentGreyBlock.BlockButtonLink;
  // School of Design block
  const DesignSchoolBlockTitle = getStrapiData(about).DesignSchool.BlockTitle;
  const DesignSchoolBlockParagraph =
    getStrapiData(about).DesignSchool.BlockParagraph;
  const DesignSchoolBlockImage = getStrapiMedia(
    getStrapiData(about).DesignSchool.BlockImage
  );
  const DesignSchoolBlockImageCaption =
    getStrapiData(about).DesignSchool.BlockImage.data.attributes.caption;
  // Third Grey block
  const ThirdContentGreyBlockTitle =
    getStrapiData(about).ThirdContentGreyBlock.BlockTitle;
  const ThirdContentGreyBlockParagraph =
    getStrapiData(about).ThirdContentGreyBlock.BlockRichText;
  const ThirdContentGreyBlockBtnLink =
    getStrapiData(about).ThirdContentGreyBlock.BlockButtonLink;
  const SchoolVideoLink = getStrapiData(about).SchoolVideo;
  return (
    <>
      <HeadData
        title={AboutSeoData.MetaTitle}
        description={AboutSeoData.MetaDescription}
        image={getStrapiMedia(AboutShareImageSeo)}
      />
      <PageHeroBanner
        OtherSide={true}
        HeroBanner={AboutHeroBanner}
        HeroTitle="About us"
      />
      <ImgCaption className="mx-2" caption={AboutHeroCaption} />
      {/* About Page General Info Block */}
      <TwoColumnsBlock className="right-img-text-block">
        <div className="text-container">
          <div className="textblock-with-divider">
            <h3>{AboutPageInfoBlockTitle}</h3>
            <TextDivider prime />
          </div>
          <p className="mt-3">{AboutPageInfoBlockParagraph}</p>
        </div>
        <div className="img-container">
          <figure>
            <img className="img-fluid" src={AboutPageInfoBlockImage} alt="" />
            <figcaption>
              <ImgCaption
                caption={AboutPageInfoBlockImageCaption}
                className="mx-0"
              />
            </figcaption>
          </figure>
        </div>
      </TwoColumnsBlock>
      {/* First content grey block */}
      <TwoColumnsBlock className="py-4 grey-block">
        <div>
          <div className="textblock-with-divider">
            <h3>{FirstContentGreyBlockTitle}</h3>
            <TextDivider prime />
          </div>
        </div>
        <div>
          <ReactMarkdown>{FirstContentGreyBlockParagraph}</ReactMarkdown>
          <Link href={FirstContentGreyBlockBtnLink}>
            <a target="_blank" type="button" className="btn btn-vic mt-4">
              See this year’s projects
            </a>
          </Link>
        </div>
      </TwoColumnsBlock>
      {/* School of Architecture section */}
      <TwoColumnsBlock className="left-img-text-block">
        <div className="img-container">
          <figure>
            <img
              className="img-fluid"
              src={SchoolArchitectureBlockImage}
              alt=""
            />
            <figcaption>
              <ImgCaption caption={SchoolArchitectureBlockImageCaption} />
            </figcaption>
          </figure>
        </div>
        <div className="text-container">
          <div className="textblock-with-divider">
            <h3>{SchoolArchitectureBlockTitle}</h3>
            <TextDivider prime />
          </div>
          <p className="mt-3">{SchoolArchitectureBlockParagraph}</p>
        </div>
      </TwoColumnsBlock>
      {/* Second content grey block */}
      <TwoColumnsBlock className="py-4 grey-block">
        <div>
          <div className="textblock-with-divider">
            <h3>{SecondContentGreyBlockTitle}</h3>
            <TextDivider prime />
          </div>
        </div>
        <div>
          <ReactMarkdown className="content content__school-list">
            {SecondContentGreyBlockParagraph}
          </ReactMarkdown>
          <Link href={SecondContentGreyBlockBtnLink}>
            <a target="_blank" type="button" className="btn btn-vic mt-4">
              Learn more
            </a>
          </Link>
        </div>
      </TwoColumnsBlock>
      {/* School of Design section */}
      <TwoColumnsBlock className="right-img-text-block">
        <div className="text-container">
          <div className="textblock-with-divider">
            <h3>{DesignSchoolBlockTitle}</h3>
            <TextDivider prime />
          </div>
          <p className="mt-3">{DesignSchoolBlockParagraph}</p>
        </div>
        <div className="img-container">
          <figure>
            <img className="img-fluid" src={DesignSchoolBlockImage} alt="" />
            <figcaption>
              <ImgCaption className="mx-0" caption={DesignSchoolBlockImageCaption}/>
            </figcaption>
          </figure>
        </div>
      </TwoColumnsBlock>
      {/* Third content grey block */}
      <TwoColumnsBlock className="py-4 grey-block">
        <div>
          <div className="textblock-with-divider">
            <h3>{ThirdContentGreyBlockTitle}</h3>
            <TextDivider prime />
          </div>
        </div>
        <div>
          <ReactMarkdown className="content content__school-list">
            {ThirdContentGreyBlockParagraph}
          </ReactMarkdown>
          <Link href={ThirdContentGreyBlockBtnLink}>
            <a target="_blank" type="button" className="btn btn-vic mt-4">
              Learn more
            </a>
          </Link>
        </div>
      </TwoColumnsBlock>
      {/* School video */}
      <div className="container school-video-container">
        <iframe src={SchoolVideoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    </>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const query = {
    populate: [
      "*",
      "AboutHeroBanner",
      "SeoData.ShareImage",
      "AboutPageInfoBlock",
      "AboutPageInfoBlock.BlockImage",
      "FirstContentGreyBlock",
      "ArchitectureSchool",
      "ArchitectureSchool.BlockImage",
      "SecondContentGreyBlock",
      "DesignSchool",
      "DesignSchool.BlockImage",
      "ThirdContentGreyBlock",
    ],
  };
  const [aboutRes] = await Promise.all([fetchAPI("/about", query)]);

  return {
    props: { about: aboutRes.data },
    revalidate: 1,
  };
}

export default About;
