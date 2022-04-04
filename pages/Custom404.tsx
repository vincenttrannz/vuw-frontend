import React from 'react';
import Link from "next/link";
import PageHeroBanner from './components/views/PageHeroBanner';
import HeadData from './components/HeadData';
import TextDivider from './components/views/TextDivider';
import TwoColumnsBlock from './layout/TwoColumnsBlock';

export default function Custom404() {
  return (
    <>
      <HeadData
        title='WFADI 404 Page'
      />
      <PageHeroBanner
        className='customError px-xl-6'
        OtherSide={false}
        HomepageSubtitle={false}
        HeroBanner={"/img/hero-banner.jpg"}
        HeroTitle="404"
        HideScrollIndicator={true}
      />
      <TwoColumnsBlock className='px-2 px-xl-7'>
        <div>
          <div className="textblock-with-divider">
            <h3>Page not found</h3>
            <TextDivider prime/>
          </div>
        </div>
        <div>
          <p>Oops the page you are looking does not exists. Check the URL to make sure you did not mis spell anything or return to the homepage.</p>
          <Link href="/">
            <a target="_self" className="btn btn-vic mt-2 mt-md-3">
              Homepage
            </a>
          </Link>
        </div>
      </TwoColumnsBlock>
    </>
  )
}