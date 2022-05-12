import React from 'react';
import type { NextPage } from "next";
import ReactMarkdown from "react-markdown";
import { PrivacyPage } from "../compilers/type";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia, getStrapiData } from "../lib/fetchData";
import { Container } from 'react-bootstrap';
import StickyShare from './components/views/StickySocial';
import PageHeroBanner from './components/views/PageHeroBanner';
import ImgCaption from "./components/views/ImgCaption";
import HeadData from "./components/HeadData";
import TextDivider from "./components/views/TextDivider";

type PrivacyPageProps = {
  privacy: PrivacyPage;
}

const privacy: NextPage<PrivacyPageProps> = ({privacy}) => {
  // Privacy page dependancies
  const PrivacySeoData = getStrapiData(privacy).SeoData;
  const PrivacyShareImageSeo = getStrapiData(privacy).SeoData.ShareImage;
  const PrivacyHeroBanner = getStrapiMedia(getStrapiData(privacy).HeroBanner);
  const PrivacyHeroCaption = getStrapiData(privacy).HeroBanner.data.attributes.caption;
  const PrivacyContent = getStrapiData(privacy).ContentBlock;
  return (
    <>
      <HeadData
        title={PrivacySeoData.MetaTitle}
        description={PrivacySeoData.MetaDescription}
        image={getStrapiMedia(PrivacyShareImageSeo)}
      />
      <StickyShare/>
      <PageHeroBanner
        OtherSide={true}
        HeroBanner={PrivacyHeroBanner}
        HeroTitle="Privacy Policy"
      />
      <ImgCaption id="caption-hero" className="mx-2 mx-lg-3" caption={PrivacyHeroCaption} />
      <Container>
        <div className='px-0 px-lg-6 py-3'>
          <div className="textblock-with-divider pb-2 pb-lg-3">
            <h2 className='h3'>Privacy Policy</h2>
            <TextDivider prime />
          </div>
          <div className='px-0 px-lg-4'>
            <ReactMarkdown className='privacy-content'>
              {PrivacyContent}
            </ReactMarkdown>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const query = {
    populate: [
      "*",
      "SeoData.ShareImage",
      "HeroBanner"
    ]
  }

  const privacyRes = await fetchAPI("/privacy", query);

  return {
    props: {
      privacy: privacyRes.data
    },
    revalidate: 1
  }
}

export default privacy;