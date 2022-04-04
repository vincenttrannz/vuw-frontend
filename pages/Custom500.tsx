import React from 'react';
import PageHeroBanner from './components/views/PageHeroBanner';
import HeadData from './components/HeadData';
import TextDivider from './components/views/TextDivider';
import TwoColumnsBlock from './layout/TwoColumnsBlock';

export default function Custom500() {
  return (
    <>
      <HeadData
        title='WFADI 500 Page'
      />
      <PageHeroBanner
        className='customError px-lg-6'
        OtherSide={false}
        HomepageSubtitle={false}
        HeroBanner={"/img/hero-banner.jpg"}
        HeroTitle="404"
        HideScrollIndicator={true}
      />
      <TwoColumnsBlock className='px-2 px-lg-7'>
        <div>
          <div className="textblock-with-divider">
            <h3>Server error</h3>
            <TextDivider prime/>
          </div>
        </div>
        <div>
          <p>Oops something went wrong. We are working hard to get the site back to work. Please visit us later.</p>
        </div>
      </TwoColumnsBlock>
    </>
  )
}